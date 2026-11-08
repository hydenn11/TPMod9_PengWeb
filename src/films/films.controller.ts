import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query, // 1. Tambahkan Query di sini
} from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
    constructor(private readonly filmsService: FilmsService) { }

    // 2. Tambahkan @Query('ditonton') di parameter
    @Get()
    tampilkanSemua(@Query('ditonton') ditonton?: string) {
        return this.filmsService.semua(ditonton);
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

    @Patch(':id')
    perbarui(
        @Param('id') id: string,
        @Body() updateFilmDto: UpdateFilmDto,
    ) {
        return this.filmsService.perbarui(id, updateFilmDto);
    }

    @Delete(':id')
    hapus(@Param('id') id: string) {
        return this.filmsService.hapus(id);
    }
}