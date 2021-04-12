import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividades } from '../actividad/actividad.entity';
import { ActividadRepository } from '../actividad/actividad.repository';
import { Video } from './video.entity';
import { VideoRepository } from './video.repository';

@Injectable()
export class VideoService {
    constructor(
        @InjectRepository(VideoRepository)
        private readonly  _videoRepository: VideoRepository,
        @InjectRepository(ActividadRepository)
        private readonly  _actividadRepository: ActividadRepository,
              
    ){}
    async getAll(): Promise<Video[]>{       
        const video: Video[] = await this._videoRepository.find({});
         return video; 
    }
    async create(video:Video ): Promise<Video>{ 
        const foundactividad:Actividades = await this._actividadRepository.findOne(video.actividad_Id);
        if(!foundactividad){
            throw new BadRequestException("Activities not exists");
        }  
        const saveVideo: Video = await this._videoRepository.save(video);
        return video; 
      }

      async get(videoid: number): Promise<Video>{
        if(!videoid){
          throw new BadRequestException("id must be sent");  
        }
        const video: Video = await this._videoRepository.findOne(videoid,{ });
         if(!video){
           throw new NotFoundException("this video does not found");  
         }
         return video;

    }
    
    async update(videoid: number, video: Video): Promise<Video>{
     
      const foundvideo = await this._videoRepository.findOne(videoid);
      if(!foundvideo){
        throw new NotFoundException("video not exist");
      }
      foundvideo.nombre = video.nombre;
      foundvideo.nivel = video.nivel;
      foundvideo.enlace = video.enlace;
      const updatevideo = await this._videoRepository.save(foundvideo);  
      return updatevideo;  
    }
    async delete(videoId: number): Promise<boolean>{
      const videoExist = await this._videoRepository.findOne(videoId);
      if(!videoExist){
        throw new NotFoundException('video does not exist');
      }
      await this._videoRepository.delete(videoId);
      return true;
    }
}
