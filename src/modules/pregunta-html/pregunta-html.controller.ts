import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { PreguntaHtmlService } from './pregunta-html.service';
import { PreguntaHtml } from './preguntahtml.entity';

@Controller('pregunta-html')
export class PreguntaHtmlController {
    constructor(private readonly _preguntahtmlService: PreguntaHtmlService){
    }
    @Get()
    getAllPreguntaHtml(): Promise<PreguntaHtml[]>{
     return this._preguntahtmlService.getAll();       
   } 
   @Post()
    createPreguntaHtml(@Body() preguntahtml: PreguntaHtml): Promise<PreguntaHtml>{
      return this._preguntahtmlService.create(preguntahtml); 
     
    }
    @Get(':preguntahtmlid')
    getPreguntaHtml(@Param('preguntahtmlid', ParseIntPipe) preguntahtmlid: number): Promise<PreguntaHtml>{
       return this._preguntahtmlService.get(preguntahtmlid);
       
   }
    @Patch(':preguntahtmlid')
    updatePreguntahtml(@Param('preguntahtmlid', ParseIntPipe) preguntahtmlid:number, @Body() preguntahtml: PreguntaHtml){
     return this._preguntahtmlService.update(preguntahtmlid, preguntahtml);
      
    }
    @Delete(':preguntahtmlid')
    deletePreguntaHtml(@Param('preguntahtmlid', ParseIntPipe) preguntahtmlid: number){
     return this._preguntahtmlService.delete(preguntahtmlid); 
    }
}
