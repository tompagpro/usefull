import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import * as bcrypt from 'bcrypt';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
    const { username, password, email } = signUpCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      // duplicate username
      if (error.code === '23505') {
        throw new ConflictException(
          "L'email / le nom d'utilisateur existe déjà.",
        );
      } else {
        throw new InternalServerErrorException(
          'Oups, un problème est survenu !',
        );
      }
    }
  }

  async signIn(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = signInCredentialsDto;
    const user = await this.userRepository.findOneBy({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: jwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Merci de vérifier vos identifiants de connexion',
      );
    }
  }
}
