import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, UpdateResult} from "typeorm";
import {Familycalender} from "./calender.entity";
import {promises} from "dns";

@Injectable()
export class CalenderService {


    constructor(
        @InjectRepository(Familycalender)
        private readonly calenderRepository: Repository<Familycalender>
    ){}


    async findNames(): Promise<Familycalender[]> {
        return this.calenderRepository.find({
            select: ["firstname"]
        });
    };


    async findSortByDate(): Promise<Familycalender[]>{
        return (await this.calenderRepository.createQueryBuilder( 'familycalender')
            .orderBy('familycalender.eventdate', 'ASC')
            .getMany());
    }

    async findEntriesByMonth(monat, year): Promise<Familycalender[]>{
        return await this.calenderRepository.query(
            "select * from familycalender  where month(eventdate) LIKE "+monat+" and year(eventdate) LIKE "+year+" order by eventdate")
    }


    findAll(): Promise<Familycalender[]>{
        return this.calenderRepository.find();
    }

    findOne(id: number):Promise<Familycalender>{
        return this.calenderRepository.findOne(id)
    }

    async deleteAllByName(name): Promise<Familycalender[]>{
        return await this.calenderRepository.query(
            'delete from familycalender where firstname LIKE "'+name+'"')
    }

    async remove(id:number): Promise<void>{
        await this.calenderRepository.delete(id)
    }

     async create(calender: Familycalender): Promise<Familycalender>{
        return this.calenderRepository.save(calender);
    }

    async update(calender: Familycalender): Promise<UpdateResult>{
        return this.calenderRepository.update(calender.id, calender)
    }

    async deleteAllByName(name): Promise<Familycalender[]>{
        return await this.calenderRepository.query(
            'delete from familycalender where firstname LIKE "'+name+'"')
    }

}


