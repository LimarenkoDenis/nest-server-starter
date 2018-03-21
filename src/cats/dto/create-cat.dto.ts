import { ApiModelProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiModelProperty()
  public readonly name: string;

  @ApiModelProperty()
  public readonly age: number;

  @ApiModelProperty()
  public readonly breed: string;
}
