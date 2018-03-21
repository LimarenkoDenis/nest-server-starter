import { ApiModelProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiModelProperty()
  public readonly email: string;

  @ApiModelProperty()
  public readonly password: string;

  @ApiModelProperty()
  public readonly remember: boolean;
}
