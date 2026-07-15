import { GoogleClientProvider } from '@spreadsheet/auth';
import { ISectionOptions } from 'docx';

declare class DocsModule {
}

declare class DriveDocsService {
    private readonly googleClient;
    private readonly logger;
    constructor(googleClient: GoogleClientProvider);
    generarPdfDesdeEstructura(payload: ISectionOptions, nombreArchivoDocx: string, carpetaContenedoraId: string): Promise<Buffer>;
    private creaDocumento;
    private construirDocumento;
    private exportarAPdf;
    private eliminarArchivo;
    obtenerArchivoComoBuffer(fileId: string): Promise<Buffer>;
}

export { DocsModule, DriveDocsService };
