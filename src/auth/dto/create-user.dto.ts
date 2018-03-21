import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty()
  public readonly email: string;

  @ApiModelProperty()
  public readonly password: string;

  @ApiModelProperty()
  public readonly name: string;

  @ApiModelProperty()
  public readonly surname: string;
}
