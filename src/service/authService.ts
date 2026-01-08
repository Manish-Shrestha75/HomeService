
import {User} from '../entities/user.entity';
import { AppDataSource } from "../config/database";
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userRepository = AppDataSource.getRepository(User);
const JWT_SECRET = process.env.JWT_SECRET || 'my_secret_key';

export const registerService = async( name: string, email:string, password: string, role: string)=>{
    const existingUser = await userRepository.findOne({ where: {email}});

    if(existingUser)
    {
        return null;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = userRepository.create({ name,email, password: hashedPassword, role});

    await userRepository.save(user);


    return{
        id: user.id,
        name: user.name,
        password: user.password,
        role: user.role
    }

}

 export const loginService = async (email:string, password: string)=>{

    const user = await userRepository.findOne({where: {email}});

    if(!user){
        return null;

    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword)
    {
        return null;
    }

    const token = jwt.sign(
        {id: user.id,
        role: user.role },
        JWT_SECRET,
        {expiresIn: '7d'})

    return {
        sucess: true,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token

    };
};

export const getUserProfileService = async(userId: string) => {
    const user = await userRepository.findOne({ where :{ id : userId}});

    if (!user){
        return null;

    }
    return{
        id:user.id,
        name:user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    }
};

export const getAllUsersService = async () => {
    const users = await userRepository.find({
        select: ['id', 'name', 'email', 'role', 'createdAt'] 
    });
    
    return users;
};
