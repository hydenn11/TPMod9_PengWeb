import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';

export class CreateFilmDto {
    @IsString({ message: 'judul harus berupa teks' })
    @IsNotEmpty({ message: 'judul tidak boleh kosong' })
    judul: string;

    @IsString({ message: 'genre harus berupa teks' })
    @IsNotEmpty({ message: 'genre tidak boleh kosong' })
    genre: string;

    @IsInt({ message: 'tahun harus berupa bilangan bulat' })
    @Min(1900, { message: 'tahun minimal adalah 1900' })
    @Max(2030, { message: 'tahun maksimal adalah 2030' })
    tahun: number;

    @IsNumber({}, { message: 'rating harus berupa angka' })
    @Min(0, { message: 'rating minimal adalah 0' })
    @Max(10, { message: 'rating maksimal adalah 10' })
    rating: number;

    @IsOptional()
    @IsBoolean({ message: 'sudahDitonton harus bertipe boolean' })
    sudahDitonton?: boolean = false;
}