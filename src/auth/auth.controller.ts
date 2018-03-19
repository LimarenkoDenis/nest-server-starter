import { CreateUserDto } from './dto/create-user.dto';
import { Controller, Post, HttpStatus, HttpCode, Get, Body, Res } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from './interfaces/user.interface';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  public constructor(
    private readonly _authService: AuthService,
  ) {}

  @Post('token')
  @HttpCode(HttpStatus.OK)
  public async getToken(): Promise<{ expires_in: number, access_token: string }> {
    return await this._authService.createToken();
  }

  @Get('authorized')
  @ApiBearerAuth()
  @ApiOperation({ title: 'Authorized route' })
  @ApiResponse({ status: 201, description: '' })
  @ApiResponse({ status: 403, description: 'Unauthorized' })
  public async authorized(): Promise<void> {
    // tslint:disable-next-line
    console.log('Authorized route...');
  }

  @Post('signup')
  @ApiOperation({ title: 'User sign up (create user)' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 401, description: 'The record already exists' })
  public async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    let newUser: User;
    try {
      const user: User | null = await this._authService.getUser({ email: createUserDto.email });
      if (user) {
        return res.status(401).json({ data: { message: 'This user already exists' }});
      }
      newUser = await this._authService.createUser(createUserDto);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: err });
    }

    return res.status(HttpStatus.OK).json({ data: newUser });
  }

}
