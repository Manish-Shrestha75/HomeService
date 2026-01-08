import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Booking } from "./booking.entity";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column()
    rating!: number;

  @Column()
    comment!: string;

  @ManyToOne(() => User)
    customer!: User;

  @ManyToOne(() => User)
    provider!: User;

  @ManyToOne(() => Booking)
    booking!: Booking;

  @CreateDateColumn()
    createdAt!: Date;
}