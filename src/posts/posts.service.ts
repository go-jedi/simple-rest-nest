import { Injectable } from '@nestjs/common';
import { CreatePostBodyDto } from './dto/create-post.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostsService {
  constructor(private fileService: FilesService) {}

  async createPost(dto: CreatePostBodyDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    // Запрос в бд на сохранение пути до файла
  }
}
