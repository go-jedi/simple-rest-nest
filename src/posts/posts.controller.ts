import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostBodyDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api-v1/posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() postDto: CreatePostBodyDto, @UploadedFile() image) {
    return this.postService.createPost(postDto, image);
  }
}
