import { ApiModelProperty } from '@nestjs/swagger';

export class AddCommentDto {
  @ApiModelProperty()
  public readonly numberId: string;

  @ApiModelProperty()
  public readonly text: string;
}
