import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto} from './dto/signUpDto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { SigninDto } from './dto/signInDto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from 'src/schema/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>, private jwtService: JwtService ) {}

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

    return await this.generateAccessToken(find._id, find.email)
  }

  async refreshTokens(refreshToken: string){
    const token = await this.refreshTokenModel.findOneAndDelete({
      token: refreshToken,
      expiryDate:{ $gte: new Date()}
    })

    if (!token){
      throw new UnauthorizedException('Refresh token is invalid!')
    }

    return this.generateAccessToken(token.userId, token.email)
  }


  async generateAccessToken(_id:any, email:string) {
    const accessToken = this.jwtService.sign({_id, email}, {expiresIn:'1h'})
    const refreshtoken = uuidv4();
    await this.storeRefreshToken(refreshtoken, _id)
    return{
      accessToken,
      refreshtoken
    }
  }

  async storeRefreshToken(token: string, userId:any) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3) // set the expiry date to 3 days
    await this.refreshTokenModel.create({
      token, expiryDate, userId
    })

  }
  
}
