import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Service } from './service.entity';

@Entity()
export class User{
  [x: string]: any;
    
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    email!: string;
    
    @Column()
    name!:string;

      @Column({
        type: 'enum',
        enum: ['user', 'admin', 'customer', 'provider'],
        default: 'user'
    })
    role!: string;


    @Column({
        type: 'enum',
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    })
    providerStatus!: string;

  @Column({ type: 'text', nullable: true })
    rejectionReason!: string; 

    @Column()
    password!: string;

     @Column({ nullable: true }) 
  confirmPassword!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @OneToMany(() => Service, (service) => service.provider)
    providedServices!: Service[];
}