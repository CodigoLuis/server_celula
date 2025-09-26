import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:8081',      // URL de tu frontend en producción
      // 'https://www.tu-dominio-principal.com',  // Si usas www también
      // Puedes agregar otros orígenes confiables aquí
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,  // Si usas cookies o autenticación basada en credenciales
    allowedHeaders: 'Content-Type, Accept, Authorization', // Ajusta según tus necesidades
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
