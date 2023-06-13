import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  private getAccessToken(user: User) {
    return {
      accessToken: this.jwtService.sign({ id: user.id }),
    };
  }

  async register({
    username,
    password,
    isSeller,
  }: RegisterDto): Promise<AuthEntity> {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.prisma.user.create({
        data: { username, password: hashedPassword, isSeller },
      });

      return this.getAccessToken(user);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(`Username already exists`);
      }

      throw new BadRequestException(`Registration failed, please try again.`);
    }
  }

  async login(username: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user) throw new NotFoundException(`User not found`);

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) throw new UnauthorizedException('Invalid password');

    return this.getAccessToken(user);
  }
}
