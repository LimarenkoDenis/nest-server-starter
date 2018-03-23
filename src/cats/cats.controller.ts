import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { RequestParamHandler, Response } from 'express';
import { Cat } from './schemas/cat.entity';

@ApiUseTags('cats')
@Controller('cats')
export class CatsController {
  public constructor(
    private readonly _catsService: CatsService,
  ) { }

  @Post()
  @ApiOperation({ title: 'Create cat' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The record has been successfully created.' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'The record already exists' })
  public async create(@Body() createCatDto: CreateCatDto, @Res() res: Response): Promise<Response> {
    let newCat: Cat;
    try {
      const cat: Cat | undefined = await this._catsService.getCat({ name: createCatDto.name });
      if (cat) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ data: { message: 'This cat already exists' }});
      }
      newCat = await this._catsService.createCat(createCatDto);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: err });
    }

    return res.status(HttpStatus.OK).json({ data: newCat });
  }

  @Get()
  @ApiOperation({ title: 'Get cats' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The list of cats', isArray: true })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  public async findAll(@Res() res: Response): Promise<Response> {
    let cats: Cat[];
    try {
      cats = await this._catsService.getCats();
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: err });
    }

    return res.status(HttpStatus.OK).json({ data: cats });
  }

  @Get(':name')
  @ApiOperation({ title: 'Get cat' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Cat object' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not found' })
  public async findOne(@Param() params: RequestParamHandler, @Res() res: Response): Promise<Response> {
    let cat: Cat | undefined;
    try {
      cat = await this._catsService.getCat({ name: params.name });
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ data: err });
    }

    return res.status(HttpStatus.OK).json({ data: cat });
  }
}
