import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DbConfigService {
  constructor(private configService: ConfigService) {}

  getDatabaseConfig(): TypeOrmModuleOptions {
    const DB_TYPE = this.configService.get<string>('DB_TYPE') as
      | 'mysql'
      | 'postgres';

    if (!DB_TYPE) {
      console.error(
        'La variable de entorno DB_TYPE no está definida. Usando PostgreSQL por defecto.',
      );
    }

    // Configuración base compartida para TypeORM
    const baseConfig: TypeOrmModuleOptions = {
      type: DB_TYPE,
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      synchronize: process.env.NODE_ENV !== 'production',
      // Aquí se listarían las rutas de las entidades
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    };

    switch (DB_TYPE) {
      case 'mysql':
        return {
          ...baseConfig,
          type: 'mysql',
          extra: {},
        } as TypeOrmModuleOptions;

      case 'postgres':
      default:
        console.log('Cargando configuración para PostgreSQL...');
        return {
          ...baseConfig,
          type: 'postgres', // Especifica el driver
          // Opciones específicas de PostgreSQL (ejemplo de SSL para entornos como Heroku)
          ssl:
            process.env.NODE_ENV === 'production'
              ? { rejectUnauthorized: false }
              : false,
        } as TypeOrmModuleOptions;
    }
  }
}
