import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from 'src/users/schemas/comment.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}
  create(createCommentDto: CreateCommentDto) {
    const createdComment = this.commentModel.create({
      text: createCommentDto.text,
      user: createCommentDto.userId,
      parent_comment: createCommentDto.parentCommentId || null,
    });
    return createdComment.then((doc) => {
      return doc.populate(['user', 'parent_comment']);
    });
  }

  findAll() {
    return this.commentModel.find().populate(['user', 'parent_comment']).exec();
  }

  findTopLevelComments() {
    return this.commentModel
      .find({
        parent_comment: null,
      })
      .populate(['user', 'parent_comment'])
      .exec();
  }

  findCommentsByParentId(parentId: string) {
    try {
      return this.commentModel
        .find({
          parent_comment: parentId,
        })
        .populate(['user', 'parent_comment'])
        .exec();
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(error.message),
        description: 'This is a description',
      });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
