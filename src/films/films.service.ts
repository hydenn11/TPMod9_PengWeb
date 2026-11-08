import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilmsService {
  private readonly logger = new Logger(FilmsService.name);
  public films: any[] = [];

  constructor() {
    const filePath = path.resolve(process.cwd(), 'src', 'films.json');
    this.films = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    this.logger.log(`Berhasil memuat ${this.films.length} film ke FilmsService`);
  }

  semua() {
    return this.films;
  }

  satu(id: string) {
    const film = this.films.find((f) => f.id === id);
    if (!film) {
      throw new NotFoundException(`Film dengan ID "${id}" tidak ditemukan.`);
    }
    return film;
  }
}
