import { Body, Controller, Get, HttpException, HttpStatus, Injectable, Logger, NotFoundException, Post, Res } from '@nestjs/common';
import { AppService, CartasService } from './app.service';
import { Table, Column, SubCollection, PrimaryKey, InjectModel } from "@spreadsheet/odm";
import { IsString, IsNotEmpty, IsNumber, IsOptional, Min, IsDateString } from "class-validator";
import type { FilterQuery, QueryOptions } from '@spreadsheet/odm';
import type { Model } from '@spreadsheet/odm/core/model';
import { DriveDocsService } from '@spreadsheet/docs';
import * as express from 'express';

export class GenerarCartaDto {
  fecha: string;
  destinatarioNombre: string;
  destinatarioCargo: string;
  destinatarioEmpresa: string;
  asunto: string;
  cuerpo: string[]; // Un array donde cada elemento es un párrafo
  remitenteNombre: string;
  remitenteCargo: string;
  remitenteContacto?: string;
  carpetaId: string; // Carpeta de Drive donde se procesará temporalmente
}

export class CreateAdelantoDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  idPlanilla: string;

  @IsString()
  @IsOptional()
  idObrero: string;

  @IsString()
  @IsNotEmpty()
  fecha: string;

  @IsNumber()
  @IsNotEmpty()
  monto: number;

  @IsString()
  @IsNotEmpty()
  motivo: string;
}

@Table('ADELANTOS_DIARIOS', { dto: CreateAdelantoDto })
export class AdelantoEntity {
  @PrimaryKey()
  @Column({ name: 'ID_ADELANTO', generated: 'short-id', index: true })
  id: string;

  @Column({ name: 'ID_PLANILLA', required: true })
  idPlanilla: string;

  @Column({ name: 'ID_OBRERO', required: true })
  idObrero: string;

  @Column({ name: 'FECHA', type: 'string', required: true })
  fecha: string;

  @Column({ name: 'MONTO', type: 'number', required: true })
  monto: number;

  @Column({ name: 'MOTIVO', type: 'string', default: 'Adelanto regular' })
  motivo: string;
}

export class CreateObreroDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsString()
  @IsNotEmpty()
  idCategoriaActual: string;

  @IsNumber()
  @IsNotEmpty()
  saldoEfectivoArrastrado: number;

  @IsNumber()
  @IsNotEmpty()
  saldoHorasExtraArrastrado: number;
}

@Table('OBREROS', { dto: CreateObreroDto })
export class ObreroEntity {
  @PrimaryKey()
  @Column({ name: 'ID_OBRERO', generated: 'short-id', index: true })
  id: string;

  @Column({ name: 'NOMBRE', required: true })
  nombre: string;

  @Column({ name: 'DNI', required: true })
  dni: string;

  @Column({ name: 'ID_CATEGORIA_ACTUAL', required: true })
  idCategoriaActual: string;

  // Arrastres financieros de la semana anterior (por falta de sencillo/monedas o sueldo adelantado)
  @Column({ name: 'SALDO_EFECTIVO_ARRANGED', type: 'number', default: 0 })
  saldoEfectivoArrastrado: number; // Positivo si se le debe dinero, Negativo si pidió adelanto de sueldo mayor a su semana

  // Arrastre de banco de horas extras de la semana anterior
  @Column({ name: 'SALDO_HORAS_EXTRA_ARRANGED', type: 'number', default: 0 })
  saldoHorasExtraArrastrado: number; // Negativo si debe horas (Dinámica de Deuda de Horas)

  @SubCollection(() => AdelantoEntity, { joinColumn: 'idObrero' })
  adelantos: AdelantoEntity[];
}
export class AjustarAdelantoDto {
  @IsString()
  @IsNotEmpty()
  idAdelanto: string;

  @IsNumber()
  @IsNotEmpty()
  montoAdicional: number;

  @IsString()
  @IsOptional()
  nota?: string;
}

export class UpsertAdelantoDiarioDto {
  @IsString()
  @IsNotEmpty()
  idPlanilla: string;

  @IsString()
  @IsNotEmpty()
  idObrero: string;

  @IsDateString() // Valida formato YYYY-MM-DD
  fecha: string;

  @IsNumber()
  @Min(0)
  monto: number;

  @IsString()
  @IsNotEmpty()
  motivo: string;
}

export class GetAdelantosReportDto {
  @IsString()
  @IsNotEmpty()
  obreroId: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  minMonto?: number = 0; // Unificamos el valor por defecto en 0
}

export class BuscarAdelantosDto {
  @IsOptional()
  query?: FilterQuery<AdelantoEntity>;
}
@Injectable()
export class PlanillaTareoService {
  private readonly logger = new Logger(PlanillaTareoService.name);

  constructor(
    @InjectModel(AdelantoEntity)
    private readonly adelantoModel: Model<AdelantoEntity>
  ) { }
  async registrarOIncrementarAdelantoDiarioPro(
    idPlanilla: string,
    idObrero: string,
    fecha: string,
    monto: number,
    motivo: string
  ) {
    this.logger.log(`[TEST:UPSERT] Ejecutando findOneAndUpdate con hidratación relacional para Obrero: ${idObrero}`);

    return await this.adelantoModel.findOneAndUpdate(
      {
        idPlanilla: idPlanilla,
        idObrero: idObrero,
        fecha: fecha
      },
      {
        $inc: { monto: monto },
        $set: { motivo: motivo }
      },
      {
        upsert: true,
        new: true, // Devuelve el dato modificado
        // 🔥 AQUÍ PROBAMOS EL MÓDULO NUEVO:
        // Queremos que el repositorio aplique resolveJoins sobre el resultado del update
        populate: 'idObrero' // Suponiendo que adelantos tiene una relación inversa o mapeas al padre
      } as any // Forzamos any si tu interfaz estricta de UpdateOptions no hereda de QueryOptions aún
    );
  }
  /**
   * Ejemplo de findOneAndUpdate con operadores $inc y $set
   * Aumenta el monto del adelanto y actualiza el motivo en una sola operación atómica.
   */
  async incrementarAdelanto(idAdelanto: string, montoAdicional: number, notaAdicional?: string) {
    this.logger.log(`[ODM:UPDATE] Incrementando S/ ${montoAdicional} al adelanto ID: ${idAdelanto}`);

    const updateQuery: any = {
      $inc: { monto: montoAdicional }
    };

    if (notaAdicional) {
      updateQuery.$set = { motivo: notaAdicional };
    }

    // Ejecutamos findOneAndUpdate pidiendo que devuelva el documento NUEVO modificado
    const adelantoActualizado = await this.adelantoModel.findOneAndUpdate(
      { id: idAdelanto },
      updateQuery,
      { new: true } // true = devuelve el dato ya sumado; false = devuelve como estaba antes
    );

    if (!adelantoActualizado) {
      throw new NotFoundException(`No se encontró el adelanto con ID: ${idAdelanto}`);
    }

    return adelantoActualizado;
  }

  /**
   * Ejemplo con UPSERT: Busca el adelanto de un obrero en una fecha específica.
   * Si existe, le suma el monto. Si no existe, crea la fila de la nada con ese monto inicial.
   */
  async registrarOIncrementarAdelantoDiario(idPlanilla: string, idObrero: string, fecha: string, monto: number, motivo: string) {
    this.logger.log(`[ODM:UPSERT] Evaluando adelanto diario para Obrero: ${idObrero} el dia ${fecha}`);

    return await this.adelantoModel.findOneAndUpdate(
      {
        idPlanilla: idPlanilla,
        idObrero: idObrero,
        fecha: fecha
      },
      {
        $inc: { monto: monto },
        $set: { motivo: motivo }
      },
      {
        upsert: true, // 🔥 Si no encuentra la fila, la crea con los datos del filtro + el update
        new: true
      }
    );
  }

  async getAdelantosReporte(obreroId: string, minMonto: number = 99) {
    // 1. Usamos la propiedad correcta 'idObrero' definida en la entidad
    const adelantos = await this.adelantoModel.find({ idObrero: obreroId });

    // 2. Ejecutamos la agregación
    return await this.adelantoModel.aggregate()
      .match({ monto: { $gt: minMonto } })
      .project({
        monto: 1,
        fecha: 1,
        // Si necesitas el idObrero en el resultado, agrégalo aquí:
        idObrero: 1
      })
      .sort({ monto: -1 })
      .runStages(adelantos);
  }

  async crearAdelanto(dto: CreateAdelantoDto) {
    this.logger.log(`Registrando nuevo adelanto para obrero: ${dto.idObrero}`);
    return await this.adelantoModel.save(dto);
  }

  async buscarAdelantos(filtro: FilterQuery<AdelantoEntity>) {
    return await this.adelantoModel.find(filtro);
  }
}
@Controller('documentos')
export class CartasController {
  constructor(private readonly cartasService: CartasService) { }

  @Post('carta-presentacion')
  async descargarCartaPresentacion(
    @Body() dto: GenerarCartaDto,
    @Res() res: express.Response
  ) {
    try {
      const pdfBuffer = await this.cartasService.generarCartaPresentacionPdf(dto);

      // Configuramos las cabeceras HTTP para forzar la descarga del PDF
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="Carta_Presentacion_${dto.remitenteNombre.replace(/\s+/g, '_')}.pdf"`
      );
      res.setHeader('Content-Length', pdfBuffer.length.toString());

      res.end(pdfBuffer);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Ocurrió un error al generar la carta de presentación en PDF.',
          details: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
@Controller('admin-planilla')
export class PlanillaAdminController {
  constructor(private readonly adelantoService: PlanillaTareoService) { }

  @Post()
  async create(@Body() body: CreateAdelantoDto) {
    return await this.adelantoService.crearAdelanto(body);
  }

  @Post('search')
  async find(@Body() query: FilterQuery<AdelantoEntity>) {
    return await this.adelantoService.buscarAdelantos(query);
  }

  @Post('reporte-adelantos')
  async getReporte(@Body() body: GetAdelantosReportDto) {
    // Si el usuario no envía minMonto, el servicio usará el valor por defecto (0)
    return await this.adelantoService.getAdelantosReporte(
      body.obreroId,
      body.minMonto ?? 0
    );
  }
  @Post('adelanto/ajustar')
  async incrementarAdelanto(
    @Body() body: { idAdelanto: string; montoAdicional: number; nota?: string }
  ) {
    return await this.adelantoService.incrementarAdelanto(
      body.idAdelanto,
      body.montoAdicional,
      body.nota
    );
  }

  @Post('adelanto/upsert-diario')
  async upsertAdelantoDiario(
    @Body() body: { idPlanilla: string; idObrero: string; fecha: string; monto: number; motivo: string }
  ) {

    return await this.adelantoService.registrarOIncrementarAdelantoDiario(
      body.idPlanilla,
      body.idObrero,
      body.fecha,
      body.monto,
      body.motivo
    );
  }
  @Post('test-upsert-relacional')
  async testUpsertRelacional(
    @Body() body: { idPlanilla: string; idObrero: string; fecha: string; monto: number; motivo: string }
  ) {
    return await this.adelantoService.registrarOIncrementarAdelantoDiarioPro(
      body.idPlanilla,
      body.idObrero,
      body.fecha,
      body.monto,
      body.motivo
    );
  }


}

