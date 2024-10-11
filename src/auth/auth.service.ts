import { HttpException, Injectable } from '@nestjs/common';
import { SignUpDto} from './dto/signUpDto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { SigninDto } from './dto/signInDto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from 'src/schema/refresh-token.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, @InjectModel(RefreshToken.name) private refreshToken: Model<RefreshToken>, private jwtService: JwtService ) {}

  async signup(signUpDto: SignUpDto){

    const {name, email, password, confirmPassword} = signUpDto;

    if (password !== confirmPassword){
      throw new HttpException('Password and confirm Password do not match', 400)
    }
    const find = await this.userModel.findOne({email:email})

    if(find){
      throw new HttpException('User already existing', 400)
    }
    const hashPassword = await bcrypt.hash(password, 10);

    return await this.userModel.create({
      name,
      email,
      password: hashPassword
    })
  }

  async signin (signInDto:SigninDto){
    const {email, password} = signInDto;

    const find = await this.userModel.findOne({email:email})
    if (!find){
      throw new HttpException('User not found!', 404)
    }

    const passwordMatch = await bcrypt.compare(password, find.password);
    if(!passwordMatch){
      throw new HttpException('Invalid credentials', 404)
    }

    const accessToken = await this.jwtService.sign({_id:find._id, email:find.email}, {expiresIn: '2h'})

    return{
      accessToken
    }
  }
  
}
