// this is where we add our business logic for this module

import { Injectable, NotFoundException } from '@nestjs/common';
import { IPost } from './post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { v4 as uuid } from 'uuid';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  private posts: IPost[] = [];

  //   create a post
  public async createPost(postDto: CreatePostDto): Promise<IPost> {
    const post: IPost = {
      ...postDto,
      id: uuid() as string,
    };
    this.posts.push(post);
    return post;
  }

  //   get all posts
  public async getAllPosts(): Promise<IPost[]> {
    return this.posts;
  }

  //   get post by Id
  public async getPostById(id: string): Promise<IPost> {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  //   update post
  public async updatePost(id: string, postDto: UpdatePostDto): Promise<IPost> {
    const post = this.posts.find((p) => p.id === id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    const newPost = Object.assign(post, postDto);
    const postIndex = this.posts.findIndex((p) => p.id === post.id);
    this.posts[postIndex] = newPost;
    return newPost;
  }

  //   delete post
  public async deletePost(id: string): Promise<void> {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex < 0) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    this.posts.splice(postIndex, 1);
  }
}
