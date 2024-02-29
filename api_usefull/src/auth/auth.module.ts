import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStategy } from './jwt.stategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'superSecret86',
      signOptions: { expiresIn: 3600 },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtStategy],
  controllers: [AuthController],
  exports: [JwtStategy, PassportModule],
})
export class AuthModule {}
