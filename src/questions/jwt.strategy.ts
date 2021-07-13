import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Profile } from './entity/profile.entity';
import { jwtPayload } from './jwt-payload.interface';
import { QuestionsRepository } from './questions.repository';
import { UserService } from './questions.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // @InjectRepository(QuestionsRepository)
    // @Injectable()
    private UserService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate(payload: jwtPayload): Promise<Profile> {
    const { username }: any = payload as any;
    const user = await Profile.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user as any;
  }
}
