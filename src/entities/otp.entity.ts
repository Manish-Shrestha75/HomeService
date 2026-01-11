import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('otps')
export class OTP {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    email!: string;

    @Column()
    otp!: string;

    @Column({ default: false })
    verified!: boolean;

    @Column()
    expiresAt!: Date;

    @CreateDateColumn()
    createdAt!: Date;
}