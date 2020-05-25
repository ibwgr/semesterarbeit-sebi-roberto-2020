import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Familycalender {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    appointment: string;

}

