import { Controller, Post, HttpStatus, HttpCode, Get } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiBearerAuth()
@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @HttpCode(HttpStatus.OK)
  public async getToken(): Promise<{ expires_in: number, access_token: string }> {
    return await this.authService.createToken();
  }

  @Get('authorized')
  @ApiOperation({ title: 'Authorized route' })
  @ApiResponse({ status: 201, description: '' })
  @ApiResponse({ status: 403, description: 'Unauthorized' })
  public async authorized(): Promise<void> {
    // tslint:disable-next-line
    console.log('Authorized route...');
  }
}
