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

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  //   get all posts
  @Get()
  public async getAllPosts(): Promise<Post[]> {
    return this.postService.getAllPosts();
  }
  //   get a single post
  @Get('/:id')
  public async getPostById(@Param('id') id: string): Promise<Post> {
    return this.postService.getPostById(id);
  }
  //   create a post
  @Post('/')
  public async createPost(@Body() postDto: CreatePostDto): Promise<Post> {
    return this.postService.createPost(postDto);
  }
  //   update a post
  @Put('/:id')
  public async updatePost(
    @Param('id') id: string,
    @Body() postDto: UpdatePostDto,
  ): Promise<Post> {
    return this.postService.updatePost(id, postDto);
  }
  //   delete a post
  @Delete('/:id')
  public async deletePost(@Param('id') id: string): Promise<void> {
    await this.postService.deletePost(id);
  }
}
