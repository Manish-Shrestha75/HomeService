import { PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Entity, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Category } from "./category.entity";

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    name!: string; 

  @Column()
    description!: string;

  @Column('decimal')
    price!: number;

  @Column({ default: 'pending' })
status!: string;
  @Column()
  isActive!: boolean;

 

  @ManyToOne(() => User)
    provider!: User;

  @CreateDateColumn()
    createdAt!: Date;

    @Column({ default: true }) 
    isAvailable!: boolean;

    @Column()
category!: string;


}