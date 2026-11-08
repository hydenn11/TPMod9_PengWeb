import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';

@Injectable()
export class FilmsService {
    private readonly logger = new Logger(FilmsService.name);
    public films: any[] = [];

    constructor() {
        const filePath = path.resolve(process.cwd(), 'src', 'films.json');
        this.films = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        this.logger.log(`Berhasil memuat ${this.films.length} film ke FilmsService`);
    }

    // Mengubah method semua() agar menerima parameter ditonton opsional
    semua(ditonton?: string) {
        if (ditonton !== undefined) {
            if (ditonton === 'true') {
                return this.films.filter((f) => f.sudahDitonton === true);
            }
            if (ditonton === 'false') {
                return this.films.filter((f) => f.sudahDitonton === false);
            }
        }
        // Jika tanpa query string, kembalikan semua film
        return this.films;
    }

    satu(id: string) {
        const film = this.films.find((f) => f.id === id);
        if (!film) {
            throw new NotFoundException(`Film dengan ID "${id}" tidak ditemukan.`);
        }
        return film;
    }

    simpan(dto: CreateFilmDto) {
        const filmBaru = {
            id: randomUUID(),
            judul: dto.judul,
            genre: dto.genre,
            tahun: dto.tahun,
            rating: dto.rating,
            sudahDitonton: dto.sudahDitonton ?? false,
        };
        this.films.push(filmBaru);
        this.logger.log(`Film baru ditambahkan dengan ID: ${filmBaru.id}`);
        return filmBaru;
    }

    // METHOD BARU: Memperbarui sebagian field film
    perbarui(id: string, dto: UpdateFilmDto) {
        const index = this.films.findIndex((f) => f.id === id);
        if (index === -1) {
            throw new NotFoundException(`Film dengan ID "${id}" tidak ditemukan.`);
        }

        // Hanya memperbarui field yang dikirimkan (bukan undefined)
        const filmLama = this.films[index];
        this.films[index] = {
            ...filmLama,
            ...(dto.judul !== undefined && { judul: dto.judul }),
            ...(dto.genre !== undefined && { genre: dto.genre }),
            ...(dto.tahun !== undefined && { tahun: dto.tahun }),
            ...(dto.rating !== undefined && { rating: dto.rating }),
            ...(dto.sudahDitonton !== undefined && { sudahDitonton: dto.sudahDitonton }),
        };

        this.logger.log(`Film ID: ${id} berhasil diperbarui.`);
        return this.films[index];
    }

    // METHOD BARU: Menghapus film dari daftar
    hapus(id: string) {
        const index = this.films.findIndex((f) => f.id === id);
        if (index === -1) {
            throw new NotFoundException(`Film dengan ID "${id}" tidak ditemukan.`);
        }

        const [filmTerhapus] = this.films.splice(index, 1);
        this.logger.log(`Film ID: ${id} berhasil dihapus.`);
        return {
            message: `Film "${filmTerhapus.judul}" (ID: ${id}) berhasil dihapus.`,
            film: filmTerhapus,
        };
    }
}