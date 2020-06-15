import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CalenderService} from "./calender.service";
import {Familycalender} from "./calender.entity";


@Controller()
export class CalenderController {

    constructor(private calenderService: CalenderService) {}


    @Get('events')
    findAll(): Promise<Familycalender[]> {
        return this.calenderService.findAll()
    }

    @Get('events/:id')
    findOne(@Param('id') id: number): any {
        return this.calenderService.findOne(id)
    }

    @Delete('events/:id')
    remove(@Param('id')id:number):any{
        return this.calenderService.remove(id)
    }

    @Post('create')
    async newAppointment(@Body() calender: Familycalender): Promise<any>{
        return this.calenderService.create(calender)
    }

    @Put('events/:id')
    async update(@Param('id') id, @Body() calender: Familycalender): Promise<any>{
        calender.id = Number(id);
        return this.calenderService.update(calender)
    }

    @Get('names')
    findByNam(): Promise<Familycalender[]> {
        return this.calenderService.findNames()
    }

    @Get('dates')
    findByDate(): Promise<Familycalender[]> {
        return this.calenderService.findSortByDate()
    }


    @Get('date/:month/:year')
    findMonth(@Param('month') month: number, @Param('year')year: number):Promise<Familycalender[]>{
        return this.calenderService.findEntriesByMonth(month, year)
    }
}
