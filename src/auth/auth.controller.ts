import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { User } from './schemas/user.entity';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  public constructor(
    private readonly _authService: AuthService,
  ) {}

  @Get('authorized')
  @ApiBearerAuth()
  @ApiOperation({ title: 'Authorized route' })
  @ApiResponse({ status: HttpStatus.OK, description: '' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Unauthorized' })
  public async authorized(@Res() res: Response): Promise<Response> {
    return res.status(HttpStatus.OK).json({ data: 'Success' });
  }

  @Post('signup')
  @ApiOperation({ title: 'User sign up (create user)' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The record has been successfully created.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'The record already exists' })
  public async signUp(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<Response> {
    let newUser: User;
    try {
      const user: User | null = await this._authService.getUser({ email: createUserDto.email });
      if (user) {
        return res.status(HttpStatus.CONFLICT).json({ data: { message: 'This user already exists' }});
      }
      const hash: string = await bcrypt.hash(createUserDto.password, 10);
      newUser = await this._authService.createUser({...createUserDto, password: hash});
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: err });
    }

    return res.status(HttpStatus.OK).json({ data: newUser });
  }

  @Post('signin')
  @ApiOperation({ title: 'User sign in' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User with token' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Wrong login or password' })
  public async signIn(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<Response> {
    let user: UserData;
    try {
      user = await this._authService.getUserWithToken({ email: loginUserDto.email });
    } catch (err) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ data: err });
    }
    if (!user || user && !await bcrypt.compare(loginUserDto.password, user.password)) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ data: { message: 'UNAUTHORIZED' } });
    }

    return res.status(HttpStatus.OK).json({ data: user});
  }
}
