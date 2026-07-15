import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional, IsObject, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
export interface DataItem {
    text: string;
    break?: number;
    style?: 'strong' | 'normal';
    img?: string; // Nombre del logo/imagen
    transformation?: {
        width: number;
        height: number;
    };
}

export interface ParagraphConfig {
    heading?: 'Heading1' | 'Heading2' | 'Heading3' | 'Heading4';
    alignment?: 'left' | 'right' | 'center' | 'justify' | 'distribute';
    indent?: {
        left?: number;
    };
    spacing?: {
        line?: number;
        after?: number;
    };
}

export class DataItem {
    @IsString()
    @IsNotEmpty()
    text: string;

    @IsOptional()
    @IsNumber()
    break?: number;

    @IsOptional()
    @IsString()
    style?: 'strong' | 'normal';

    @IsOptional()
    @IsString()
    img?: string;

    @IsOptional()
    @IsObject()
    transformation?: { width: number; height: number };

    @IsOptional()
    @IsString()
    imgSource?: 'web' | 'drive' | 'local';
}

// 2. Convertimos ParagraphConfig a clase
export class ParagraphConfig {
    @IsOptional()
    @IsString()
    heading?: 'Heading1' | 'Heading2' | 'Heading3' | 'Heading4';

    @IsOptional()
    @IsString()
    alignment?: 'left' | 'right' | 'center' | 'justify' | 'distribute';

    @IsOptional()
    @IsObject()
    indent?: { left?: number };

    @IsOptional()
    @IsObject()
    spacing?: { line?: number; after?: number };
}

// 3. Convertimos BloqueContenido a clase
export class BloqueContenido {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DataItem) // Ahora funcionará porque DataItem es una clase
    data: DataItem[];

    @IsOptional()
    @ValidateNested()
    @Type(() => ParagraphConfig) // Ahora funcionará porque ParagraphConfig es una clase
    config?: ParagraphConfig;
}

// 4. Tu DTO principal
export class RenderDocumentoDto {
    @IsString()
    @IsNotEmpty()
    carpetaId: string;

    @IsString()
    @IsNotEmpty()
    nombreArchivo: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BloqueContenido) // Ahora funcionará porque BloqueContenido es una clase
    bloques: BloqueContenido[];
}