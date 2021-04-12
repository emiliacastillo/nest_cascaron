import { DocumentoService } from './documento.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import {Documento} from "./documento.entity";

@Controller('documento')
export class DocumentoController {
    constructor(private readonly _documentoService: DocumentoService){
    }
    @Get()
    getAllDocumento(): Promise<Documento[]>{
     return this._documentoService.getAll();       
   } 
   @Post()
    createDocumento(@Body() documento: Documento): Promise<Documento>{
      return this._documentoService.create(documento); 
     
    }
    @Get(':documentoid')
    getDocumento(@Param('documentoid', ParseIntPipe) documentoid: number): Promise<Documento>{
       return this._documentoService.get(documentoid);
       
   }
    @Patch(':documentoid')
    updateDocumento(@Param('documentoid', ParseIntPipe) documentoid:number, @Body() documento: Documento){
     return this._documentoService.update(documentoid, documento);
      
    }
    @Delete(':documentoid')
    deleteDocumento(@Param('documentoid', ParseIntPipe) documentoid: number){
     return this._documentoService.delete(documentoid); 
    }
}
