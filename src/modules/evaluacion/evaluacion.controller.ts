import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Evaluacion } from './evaluacion.entity';
import { EvaluacionService } from './evaluacion.service';

@Controller('evaluacion')
export class EvaluacionController {
    constructor(private readonly _evaluacionService: EvaluacionService){
    }
    @Get()
    getAllEvaluacion(): Promise<Evaluacion[]>{
     return this._evaluacionService.getAll();       
   } 
   @Post()
    createEvaluacion(@Body() evaluacion: Evaluacion): Promise<Evaluacion>{
      return this._evaluacionService.create(evaluacion); 
     
    }
    @Get(':evaluacionid')
    getEvaluacion(@Param('evaluacionid', ParseIntPipe) evaluacionid: number): Promise<Evaluacion>{
       return this._evaluacionService.get(evaluacionid);
       
   }
    @Patch(':evaluacionid')
    updateEvaluacion(@Param('evaluacionid', ParseIntPipe) evaluacionid:number, @Body() evaluacion: Evaluacion){
     return this._evaluacionService.update(evaluacionid, evaluacion);
      
    }
    @Delete(':evaluacionid')
    deleteEvaluacion(@Param('evaluacionid', ParseIntPipe) evaluacionid: number){
     return this._evaluacionService.delete(evaluacionid); 
    }
}
