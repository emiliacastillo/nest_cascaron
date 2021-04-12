import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividades } from '../actividad/actividad.entity';
import { ActividadRepository } from '../actividad/actividad.repository';
import { PreguntaHtml } from './preguntahtml.entity';
import { PreguntaHtmlRepository } from './pregunta_html.repository';

@Injectable()
export class PreguntaHtmlService {
    constructor(
        @InjectRepository(PreguntaHtmlRepository)
        private readonly  _preguntahtmlRepository: PreguntaHtmlRepository,
        @InjectRepository(ActividadRepository)
        private readonly  _actividadRepository: ActividadRepository,
              
    ){}
    async getAll(): Promise<PreguntaHtml[]>{       
        const preguntahtml: PreguntaHtml[] = await this._preguntahtmlRepository.find({});
         return preguntahtml; 
    }
    async create(preguntahtml:PreguntaHtml ): Promise<PreguntaHtml>{ 
        const foundactividad:Actividades = await this._actividadRepository.findOne(preguntahtml.actividad_Id);
        if(!foundactividad){
            throw new BadRequestException("Activities not exists");
        }  
        const savePreguntahtml: Preguntahtml = await this._preguntahtmlRepository.save(preguntahtml);
        return preguntahtml; 
      }

      async get(preguntahtmlid: number): Promise<Preguntahtml>{
        if(!preguntahtmlid){
          throw new BadRequestException("id must be sent");  
        }
        const preguntahtml: Preguntahtml = await this._preguntahtmlRepository.findOne(preguntahtmlid,{ });
         if(!preguntahtml){
           throw new NotFoundException("this preguntahtml does not found");  
         }
         return preguntahtml;

    }
    
    async update(preguntahtmlid: number, preguntahtml: Preguntahtml): Promise<Preguntahtml>{
     
      const foundpreguntahtml = await this._preguntahtmlRepository.findOne(preguntahtmlid);
      if(!foundpreguntahtml){
        throw new NotFoundException("preguntahtml not exist");
      }
      foundpreguntahtml.punto = preguntahtml.punto;
      foundpreguntahtml.descripcion = preguntahtml.descripcion;
      const updatepreguntahtml = await this._preguntahtmlRepository.save(foundpreguntahtml);  
      return updatepreguntahtml;  
    }
    async delete(preguntahtmlId: number): Promise<boolean>{
      const preguntahtmlExist = await this._preguntahtmlRepository.findOne(preguntahtmlId);
      if(!preguntahtmlExist){
        throw new NotFoundException('preguntahtml does not exist');
      }
      await this._preguntahtmlRepository.delete(preguntahtmlId);
      return true;
    }
}
