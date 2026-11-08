import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Mengaktifkan validasi otomatis di seluruh aplikasi
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Membuang properti asing yang tidak ada di DTO
      forbidNonWhitelisted: true, // Menolak jika ada properti terlarang
      transform: true, // Otomatis mengubah tipe payload sesuai DTO
    }),
  );

  await app.listen(3000);
}
bootstrap();