// this is where we add our business logic for this module

import { Injectable, NotFoundException } from '@nestjs/common';
import { IPost } from './post.interface';
import { CreatePostDto } from './dto/create-post.dto';
// import { v4 as uuid } from 'uuid';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  // private posts: IPost[] = [];

  //   create a post
  public async createPost(postDto: CreatePostDto): Promise<Post> {
    // const post: IPost = {
    //   ...postDto,
    //   id: uuid() as string,
    // };
    const post = this.postRepository.create(postDto);
    // this.posts.push(post);
    await this.postRepository.save(post);
    return post;
  }

  //   get all posts
  public async getAllPosts(): Promise<Post[]> {
    // return this.posts;
    return this.postRepository.find();
  }

  //   get post by Id
  public async getPostById(id: string): Promise<Post> {
    // const post = this.posts.find((post) => post.id === id);
    const post = this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  //   update post
  public async updatePost(id: string, postDto: UpdatePostDto): Promise<Post> {
    // const post = this.posts.find((p) => p.id === id);
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    const newPost = Object.assign(post, postDto);
    // const postIndex = this.posts.findIndex((p) => p.id === post.id);
    // this.posts[postIndex] = newPost;
    newPost.updatedAt = new Date();
    await this.postRepository.save(newPost);
    return newPost;
  }

  //   delete post
  public async deletePost(id: string): Promise<void> {
    // const postIndex = this.posts.findIndex((post) => post.id === id);

    // if (postIndex < 0) {
    //   throw new NotFoundException(`Post with id ${id} not found`);
    // }
    // this.posts.splice(postIndex, 1);
    await this.postRepository.delete(id);
  }
}
