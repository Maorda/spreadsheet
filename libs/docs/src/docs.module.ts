import { Module } from '@nestjs/common';
import { DriveDocsService } from './drive-docs.service';
import { CompiladorController } from './compilador.controller';
import { DocumentCompilerService } from './document-compiler.service';

@Module({
  controllers: [CompiladorController],
  providers: [DriveDocsService, DocumentCompilerService],
  exports: [DriveDocsService, DocumentCompilerService],

})
export class DocsModule { }
