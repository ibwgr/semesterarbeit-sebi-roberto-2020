import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


@Entity('familycalender')

export class Familycalender {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    eventdate: Date;


    @Column()
    appointment: string;



 }

