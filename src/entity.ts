import { Column, PrimaryKey, SubCollection, Table } from "@spreadsheet/odm";
import { IsString, IsNotEmpty, IsDate, IsNumber, IsOptional } from "class-validator";

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



export class GetAdelantosReportDto {
    @IsString()
    @IsNotEmpty()
    obreroId: string;

    @IsNumber()
    @IsOptional()
    minMonto?: number = 0; // Valor por defecto
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
