import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CalenderService} from "./calender.service";
import {Familycalender} from "./calender.entity";


@Controller('events')
export class CalenderController {

    constructor(private calenderService: CalenderService) {}


    @Get()
    findAll(): Promise<Familycalender[]> {
        return this.calenderService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string): any {
        return this.calenderService.findOne(id)
    }

   @Delete(':id')
    remove(@Param('id')id:string):any{
        return this.calenderService.remove(id)
   }

   @Post('create')
     async newAppointment(@Body() calender: Familycalender): Promise<any>{
        return this.calenderService.create(calender)
   }

   @Put(':id')
    async update(@Param('id') id, @Body() calender: Familycalender): Promise<any>{
        calender.id = Number(id);
        return this.calenderService.update(calender)
   }
}
