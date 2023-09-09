import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({status: 0, msg: 'Unauthorized' });
    }

    try {
      const decodedToken = verify(token, 'secretKey');
      req['userId'] = decodedToken.userId;
      next();
    } catch (err) {
      return res.status(401).json({status: 0, msg: 'Unauthorized' });
    }
  }
}