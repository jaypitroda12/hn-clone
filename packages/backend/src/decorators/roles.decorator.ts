import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const AllowedRoles = (isSeller: boolean) =>
  SetMetadata(ROLES_KEY, isSeller);
