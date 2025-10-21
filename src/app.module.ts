import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { DivisionModule } from './division/division.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbType = configService.get<string>('DB_TYPE') as
          | 'mysql'
          | 'postgres';

        const baseConfig = {
          type: dbType,
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: process.env.NODE_ENV !== 'production',
        };

        if (dbType === 'mysql') {
          return {
            ...baseConfig,
            charset: 'utf8mb4',
            timezone: '-05:00',
          };
        }

        if (dbType === 'postgres') {
          return {
            ...baseConfig,
            ssl:
              process.env.NODE_ENV === 'production'
                ? { rejectUnauthorized: false }
                : false,
            extra: {
              max: 10, // Tamaño del pool de conexiones
            },
          };
        }

        return baseConfig;
      },
    }),
    DivisionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
