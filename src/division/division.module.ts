import { Module } from '@nestjs/common';
import { DivisionService } from './division.service';
import { DivisionController } from './division.controller';
import { Division } from 'src/entity/division.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [DivisionService],
  controllers: [DivisionController],
  imports: [TypeOrmModule.forFeature([Division])],
})
export class DivisionModule {}
