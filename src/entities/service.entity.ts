import { PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Entity } from "typeorm";
import { User } from "./user.entity";

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
    

  @Column()
    category!: string; 

  @ManyToOne(() => User)
    provider!: User;

  @CreateDateColumn()
    createdAt!: Date;

    @Column({ default: true }) 
    isAvailable!: boolean;
}