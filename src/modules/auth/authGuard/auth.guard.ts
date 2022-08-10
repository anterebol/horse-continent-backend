import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtServise: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      console.log(authHeader);
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('user is not logged in');
      }
      const user = this.jwtServise.verify(token);
      req.user = user;
      return true;
    } catch {
      throw new UnauthorizedException('user is not logged in');
    }
  }
}
