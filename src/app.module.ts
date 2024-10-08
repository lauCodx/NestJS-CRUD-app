import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthModule,
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: '.env'
    }),
    MongooseModule.forRoot(process.env.CONNECTION_STRING)

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
