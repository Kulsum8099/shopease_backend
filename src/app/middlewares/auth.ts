import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { jwtHelper } from '../util/jwt';

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'Authorization token is missing or invalid'
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwtHelper.verifyAccessToken(token);

    if (!decoded) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
    }

    // Now TypeScript knows that decoded is of type JwtPayload
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };

    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
