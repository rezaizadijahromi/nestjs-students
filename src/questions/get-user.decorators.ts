import { createParamDecorator } from '@nestjs/common';
import { Profile } from './entitys/profile.entity';

export const GetUser = createParamDecorator((data, req): Profile => {
  return req.user;
});
