import {
    IsString,
    IsNotEmpty,
    IsArray,
    ValidateNested,
    IsOptional,
    IsNumber,
    IsBoolean,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';

// 1. Clases auxiliares para blindar las propiedades anidadas contra el whitelist: true
export class TransformationConfig {
    @IsNumber()
    @Min(1)
    width: number;

    @IsNumber()
    @Min(1)
    height: number;
}

export class IndentConfig {
    @IsOptional()
    @IsNumber()
    left?: number;
}

export class SpacingConfig {
    @IsOptional()
    @IsNumber()
    line?: number;

    @IsOptional()
    @IsNumber()
    after?: number;
}

// 2. DataItem con objetos anidadas transformados
export class DataItem {
    @IsOptional()
    @IsNumber()
    size?: number;

    @IsOptional()
    @IsString()
    text?: string;

    @IsOptional()
    @IsString()
    font?: string;

    @IsOptional()
    @IsNumber()
    break?: number;

    @IsOptional()
    @IsString()
    style?: 'strong' | 'normal';

    @IsOptional()
    @IsString()
    img?: string;

    // 🛡️ Ahora class-validator inspeccionará width y height sin borrarlos
    @IsOptional()
    @ValidateNested()
    @Type(() => TransformationConfig)
    transformation?: TransformationConfig;

    @IsOptional()
    @IsString()
    imgSource?: 'web' | 'drive' | 'local';

    @IsOptional()
    @IsBoolean()
    isPageNumber?: boolean;

    @IsOptional()
    @IsBoolean()
    isTotalPages?: boolean;
}

// 3. ParagraphConfig con indent y spacing transformados
export class ParagraphConfig {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    heading?: 'Heading1' | 'Heading2' | 'Heading3' | 'Heading4';

    @IsOptional()
    @IsString()
    alignment?: 'left' | 'right' | 'center' | 'justify' | 'distribute';

    // 🛡️ Ahora class-validator inspeccionará left, line y after sin borrarlos
    @IsOptional()
    @ValidateNested()
    @Type(() => IndentConfig)
    indent?: IndentConfig;

    @IsOptional()
    @ValidateNested()
    @Type(() => SpacingConfig)
    spacing?: SpacingConfig;
}

export class BloqueContenido {
    @IsOptional()
    @IsString()
    type?: 'text' | 'toc';

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DataItem)
    data: DataItem[] = []; // 🛡️ Inicializado por defecto para evitar "data is not iterable"

    @IsOptional()
    @ValidateNested()
    @Type(() => ParagraphConfig)
    config?: ParagraphConfig;
}

export class PageConfig {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DataItem)
    data: DataItem[] = []; // 🛡️ Inicializado por defecto

    @IsOptional()
    @IsString()
    alignment?: 'left' | 'right' | 'center';
}

export class RenderDocumentDto {
    @IsString()
    @IsNotEmpty()
    carpetaId: string;

    @IsString()
    @IsNotEmpty()
    nombreArchivo: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BloqueContenido)
    bloques: BloqueContenido[] = []; // 🛡️ Inicializado por defecto

    @IsOptional()
    @ValidateNested()
    @Type(() => PageConfig)
    header?: PageConfig;

    @IsOptional()
    @ValidateNested()
    @Type(() => PageConfig)
    footer?: PageConfig;
}