import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Appcontroller } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';


@Module({
  imports: [AuthModule,
    ConfigModule.forRoot({
      isGlobal:true,
     
      envFilePath: '.env'
    }),

    JwtModule.registerAsync({
      global:true,
      inject:[ConfigService],
      useFactory: ()=>({
        secret:process.env.SECRET_KEY
      })

    }),

   /* MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DB_STRING,  
      }),
    })*/

    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async () =>({
        uri: process.env.DB_STRING
      }),

      inject:[ConfigService]
    }),

   BookModule,

   
  ],

  controllers: [Appcontroller],
  providers: [AppService],
})
export class AppModule {}

