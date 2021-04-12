import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Video } from './video.entity';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
    constructor(private readonly _videoService: VideoService){
    }
    @Get()
    getAllVideo(): Promise<Video[]>{
     return this._videoService.getAll();       
   } 
   @Post()
    createVideo(@Body() video: Video): Promise<Video>{
      return this._videoService.create(video); 
     
    }
    @Get(':videoid')
    getVideo(@Param('videoid', ParseIntPipe) videoid: number): Promise<Video>{
       return this._videoService.get(videoid);
       
   }
    @Patch(':videoid')
    updateVideo(@Param('videoid', ParseIntPipe) videoid:number, @Body() video: Video){
     return this._videoService.update(videoid, video);
      
    }
    @Delete(':videoid')
    deleteVideo(@Param('videoid', ParseIntPipe) videoid: number){
     return this._videoService.delete(videoid); 
    }
}
