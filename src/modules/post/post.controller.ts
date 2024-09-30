import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { IPost } from './post.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  //   get all posts
  @Get()
  public async getAllPosts(): Promise<IPost[]> {
    return this.postService.getAllPosts();
  }
  //   get a single post
  @Get('/:id')
  public async getPostById(@Param('id') id: string): Promise<IPost> {
    return this.postService.getPostById(id);
  }
  //   create a post
  @Post('/')
  public async createPost(@Body() postDto: CreatePostDto): Promise<IPost> {
    return this.postService.createPost(postDto);
  }
  //   update a post
  @Put('/:id')
  public async updatePost(
    @Param('id') id: string,
    @Body() postDto: UpdatePostDto,
  ): Promise<IPost> {
    return this.postService.updatePost(id, postDto);
  }
  //   delete a post
  @Delete('/:id')
  public async deletePost(@Param('id') id: string): Promise<void> {
    await this.postService.deletePost(id);
  }
}
