import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Service } from "./service.entity";
import { Review } from "./review.entity";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
    id!: string;
  
  @Column({ unique: true, nullable: true })
  bookingNumber!: string;

  @Column()
    bookingDate!: Date;

  @Column()
    startTime!: string; 

  @Column()
    endTime!: string;

   @Column({
    type: 'enum',
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'})
    status!: string;

  @ManyToOne(() => User)
    customer!: User;

  @ManyToOne(() => User)
    provider!: User;

  @ManyToOne(() => Service)
  service!: Service;

  @CreateDateColumn()
    createdAt!: Date;
    
  @OneToOne(() => Review, (review) => review.booking)
  review!: Review;
}