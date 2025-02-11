import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

// 扩展Express的Request类型
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 这里是一个简单的中间件实现，实际项目中应该实现完整的认证逻辑
  req.user = { id: "1" };
  next();
};