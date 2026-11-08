import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  tampilkanSemua() {
    return this.filmsService.semua();
  }

  @Get(':id')
  tampilkanDetail(@Param('id') id: string) {
    return this.filmsService.satu(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  tambah(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.simpan(createFilmDto);
  }
}
