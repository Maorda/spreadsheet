import { Module } from '@nestjs/common';
import { OdmService } from './odm.service';

@Module({
  providers: [OdmService],
  exports: [OdmService],
})
export class OdmModule {}
