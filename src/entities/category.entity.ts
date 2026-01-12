import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "./service.entity";

@Entity()
export class Category{
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({ unique: true })
    name!: string;

    @Column({nullable: true})
    description!: string;


 

    @Column({ default: true })
    isActive!: boolean;

    @CreateDateColumn()
    createdAt!: Date;
    
    @Column({ nullable: true })
    updatedAt!: Date;

}

