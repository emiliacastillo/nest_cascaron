import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividades } from '../actividad/actividad.entity';
import { ActividadRepository } from '../actividad/actividad.repository';
import { Documento } from './documento.entity';
import { DocumentoRepository } from './documento.repository';

@Injectable()
export class DocumentoService {
    constructor(
        @InjectRepository(DocumentoRepository)
        private readonly  _documentoRepository: DocumentoRepository,
        @InjectRepository(ActividadRepository)
        private readonly  _actividadRepository: ActividadRepository,
              
    ){}
    async getAll(): Promise<Documento[]>{       
        const documento: Documento[] = await this._documentoRepository.find({});
         return documento; 
    }
    async create(documento:Documento ): Promise<Documento>{ 
        const foundactividad:Actividades = await this._actividadRepository.findOne(documento.actividad_Id);
        if(!foundactividad){
            throw new BadRequestException("Activities not exists");
        }  
        const saveDocumento: Documento = await this._documentoRepository.save(documento);
        return documento; 
      }

      async get(documentoid: number): Promise<Documento>{
        if(!documentoid){
          throw new BadRequestException("id must be sent");  
        }
        const documento: Documento = await this._documentoRepository.findOne(documentoid,{ });
         if(!documento){
           throw new NotFoundException("this documento does not found");  
         }
         return documento;

    }
    
    async update(documentoid: number, documento: Documento): Promise<Documento>{
     
      const founddocumento = await this._documentoRepository.findOne(documentoid);
      if(!founddocumento){
        throw new NotFoundException("documento not exist");
      }
      founddocumento.nombre = documento.nombre;
      founddocumento.nivel = documento.nivel;
      founddocumento.enlace = documento.enlace;
      const updatedocumento = await this._documentoRepository.save(founddocumento);  
      return updatedocumento;  
    }
    async delete(documentoId: number): Promise<boolean>{
      const documentoExist = await this._documentoRepository.findOne(documentoId);
      if(!documentoExist){
        throw new NotFoundException('Documento does not exist');
      }
      await this._documentoRepository.delete(documentoId);
      return true;
    }
}

