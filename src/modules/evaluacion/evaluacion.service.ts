import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividades } from '../actividad/actividad.entity';
import { ActividadRepository } from '../actividad/actividad.repository';
import { Evaluacion } from './evaluacion.entity';
import { EvaluacionRepository } from './evalucion.repository';

@Injectable()
export class EvaluacionService {
    constructor(
        @InjectRepository(EvaluacionRepository)
        private readonly  _evaluacionRepository: EvaluacionRepository,
        @InjectRepository(ActividadRepository)
        private readonly  _actividadRepository: ActividadRepository,
              
    ){}
    async getAll(): Promise<Evaluacion[]>{       
        const evaluacion: Evaluacion[] = await this._evaluacionRepository.find({});
         return evaluacion; 
    }
    async create(evaluacion:Evaluacion ): Promise<Evaluacion>{ 
        const foundactividad:Actividades = await this._actividadRepository.findOne(evaluacion.actividad_Id);
        if(!foundactividad){
            throw new BadRequestException("Activities not exists");
        }  
        const saveEvaluacion: Evaluacion = await this._evaluacionRepository.save(evaluacion);
        return evaluacion; 
      }

      async get(evaluacionid: number): Promise<Evaluacion>{
        if(!evaluacionid){
          throw new BadRequestException("id must be sent");  
        }
        const evaluacion: Evaluacion = await this._evaluacionRepository.findOne(evaluacionid,{ });
         if(!evaluacion){
           throw new NotFoundException("this evaluacion does not found");  
         }
         return evaluacion;

    }
    
    async update(evaluacionid: number, evaluacion: Evaluacion): Promise<Evaluacion>{
     
      const foundevaluacion = await this._evaluacionRepository.findOne(evaluacionid);
      if(!foundevaluacion){
        throw new NotFoundException("evaluacion not exist");
      }
      foundevaluacion.punto = evaluacion.punto;
      foundevaluacion.descripcion = evaluacion.descripcion;
      const updateevaluacion = await this._evaluacionRepository.save(foundevaluacion);  
      return updateevaluacion;  
    }
    async delete(evaluacionId: number): Promise<boolean>{
      const evaluacionExist = await this._evaluacionRepository.findOne(evaluacionId);
      if(!evaluacionExist){
        throw new NotFoundException('evaluacion does not exist');
      }
      await this._evaluacionRepository.delete(evaluacionId);
      return true;
    }
}
