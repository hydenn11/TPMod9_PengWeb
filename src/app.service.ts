import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  public films: any[] = [];

  constructor() {
    const filePath = path.resolve(process.cwd(), 'src', 'films.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    this.films = JSON.parse(raw);

    this.logger.log('Data films.json berhasil dimuat:');
    console.log(this.films);
  }

  getHello(): string {
    return 'Hello World!';
  }

  getAllFilms() {
    return this.films;
  }

  getFilmById(id: string) {
    const film = this.films.find((f) => f.id === id);
    if (!film) {
      throw new NotFoundException(`Film dengan ID "${id}" tidak ditemukan.`);
    }
    return film;
  }
}
