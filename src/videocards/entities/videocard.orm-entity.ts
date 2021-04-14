import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class VideocardOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    price: number;

    @Column()
    href: string;

    @Column()
    code: string;
}