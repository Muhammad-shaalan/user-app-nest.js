import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {


  // Static user [Act as user saved in DB]
  private readonly users = [
    {id: 1, email: 'admin@example.com', password: '123456' },
  ];


  // Check if user add email & password
  validateUser(email: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.email === email && u.password === password,
    );
    return !!user;
  }


  // Genereate Token Through JSON_WEB_TOKEN
  generateToken(userId: number): string {
    const token = sign({ userId }, 'secretKey', { expiresIn: '1h' });
    return token;
  }

  
}