import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserShema } from 'src/schema/user.schema';
import { RefreshToken, RefreshTokenSchema } from 'src/schema/refresh-token.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:User.name, schema:UserShema},
      {name:RefreshToken.name, schema:RefreshTokenSchema}
    ])

  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
