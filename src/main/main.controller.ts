import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { MainService } from './main.service';
import { Response } from 'express';
import * as path from 'path';

@ApiUseTags('courses')
@Controller('courses')
export class MainController {
  public constructor(
    private readonly _mainService: MainService,
  ) {}

  @Get('/courses')
  @ApiBearerAuth()
  @ApiOperation({ title: 'corses' })
  @ApiResponse({ status: HttpStatus.OK, description: '' })
  public async getCourses(@Res() res: Response): Promise<any> {
    try {
      const courses: any = await this._mainService.getCourses();
      return res.render(path.join(__dirname + '/templates/courses.pug'), {
        courses,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ err });
    }
  }


}
