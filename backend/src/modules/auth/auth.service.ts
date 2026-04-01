import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import jwtConfig from '../../config/jwt.config';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { JwtPayload } from './interfaces/jwt-payload.interface';
import { User, UserDocument } from './schemas/user.schema';

interface AuthUserResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string;
  preferredLang: string;
  onboardingProfile: string[];
  favoriteModels: string[];
}

interface AuthResult {
  token: string;
  user: AuthUserResponse;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResult> {
    const existingUser = await this.userModel
      .findOne({ email: registerDto.email.toLowerCase() })
      .exec();

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.userModel.create({
      ...registerDto,
      email: registerDto.email.toLowerCase(),
      password: hashedPassword,
      role: registerDto.role ?? 'user',
      avatar: registerDto.avatar ?? '👤',
      preferredLang: registerDto.preferredLang ?? 'en',
      onboardingProfile: registerDto.onboardingProfile ?? [],
      favoriteModels: registerDto.favoriteModels ?? [],
    });

    return this.buildAuthResponse(user);
  }

  async login(loginDto: LoginDto): Promise<AuthResult> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.buildAuthResponse(user);
  }

  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email: email.toLowerCase() }).exec();
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }

  async validateUserById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  private async buildAuthResponse(user: UserDocument): Promise<AuthResult> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = await this.jwtService.signAsync(payload, {
      secret: this.jwtConfiguration.secret,
      expiresIn: this.jwtConfiguration.expiresIn,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        preferredLang: user.preferredLang,
        onboardingProfile: user.onboardingProfile,
        favoriteModels: user.favoriteModels,
      },
    };
  }
}
