import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  parentCommentId: string | null;
}
