import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";

import {FindConditions, FindManyOptions, Repository, UpdateResult} from "typeorm";
import {Familycalender} from "./calender.entity";
import {options} from "tsconfig-paths/lib/options";
import {fchmod} from "fs";

@Injectable()
export class CalenderService {


    constructor(
        @InjectRepository(Familycalender)
        private readonly calenderRepository: Repository<Familycalender>
    ){}


    findAll(): Promise<Familycalender[]>{
        return this.calenderRepository.find();
    }

    findOne(id: string):Promise<Familycalender>{
        return this.calenderRepository.findOne(id)
    }

    async remove(id:string): Promise<void>{
        await this.calenderRepository.delete(id)
    }

     async create(calender: Familycalender): Promise<Familycalender>{
        return this.calenderRepository.save(calender);
    }

    async update(calender: Familycalender): Promise<UpdateResult>{
        return this.calenderRepository.update(calender.id, calender)
    }


}


