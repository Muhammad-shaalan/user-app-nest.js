import { IsNotEmpty, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
export class User {
    id: number;
    
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string;
}
  