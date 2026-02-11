import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'; // Importante para tipos
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.enableCors();
  app.enableCors({
    origin: true,
    //   // origin: [
    //   // 'http://localhost:8081',      // URL de tu frontend en producción
    //   // 'https://www.tu-dominio-principal.com',  // Si usas www también
    //   // Puedes agregar otros orígenes confiables aquí
    //   // ],
    //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    //   credentials: true,  // Si usas cookies o autenticación basada en credenciales
    //   allowedHeaders: 'Content-Type, Accept, Authorization', // Ajusta según tus necesidades
    //   preflightContinue: false,
    //   optionsSuccessStatus: 204,
  });

  // Esto permite que: http://TU_IP:3000/public/profileFiles/nombre_archivo.jpg funcione
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/public', // Prefijo para la URL
  });

  await app.listen(3000, '0.0.0.0');
  // await app.listen(process.env.PORT ?? 3000, '0.0.0.0');

}
bootstrap();

