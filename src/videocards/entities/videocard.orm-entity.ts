import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class VideocardOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    srcImage: string;

    @Column()
    href: string;

    @Column()
    shop: string;
}