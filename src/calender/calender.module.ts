import { Module } from '@nestjs/common';
import { CalenderService } from './calender.service';
import { CalenderController } from './calender.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Familycalender} from './calender.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Familycalender])],
  providers: [CalenderService],
  controllers: [CalenderController]
})

export class CalenderModule {}
