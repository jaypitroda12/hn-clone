import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isSeller = this.reflector.getAllAndOverride<boolean | undefined>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (isSeller === undefined) return true;

    const request = context.switchToHttp().getRequest();
    return request.user.isSeller === isSeller;
  }
}
