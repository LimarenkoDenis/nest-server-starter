import { Controller, Get, Post, Res, Body, Param, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@ApiUseTags('cats')
@Controller('cats')
export class CatsController {
  public constructor(
    private readonly _catsService: CatsService,
  ) { }

  @Post()
  @ApiOperation({ title: 'Create cat' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 401, description: 'The record already exists' })
  public async create(@Body() createCatDto: CreateCatDto, @Res() res) {
    let newCat: Cat;
    try {
      const cat: Cat | null = await this._catsService.getCat({ name: createCatDto.name });
      if (cat) {
        return res.status(401).json({ data: { message: 'This cat already exists' }});
      }
      newCat = await this._catsService.createCat(createCatDto);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: err });
    }

    return res.status(HttpStatus.OK).json({ data: newCat });
  }

  @Get()
  @ApiOperation({ title: 'Get cats' })
  @ApiResponse({ status: 200, description: 'The list of cats', isArray: true })
  @ApiResponse({ status: 404, description: 'Bad request' })
  public async findAll(@Res() res): Promise<Cat[]> {
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
  @ApiResponse({ status: 200, description: 'Cat object' })
  @ApiResponse({ status: 404, description: 'Not found' })
  public async findOne(@Param() params, @Res() res) {
    let cat: Cat;
    try {
      cat = await this._catsService.getCat({ name: params.name });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ data: err });
    }

    return res.status(HttpStatus.OK).json({ data: cat });
  }
}
