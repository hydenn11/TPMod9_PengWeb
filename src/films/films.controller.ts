import { Controller, Get, Param } from '@nestjs/common';
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
}
