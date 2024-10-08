import { HttpException, Injectable } from '@nestjs/common';
import { SignUpDto} from './dto/signUpDto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(signUpDto: SignUpDto){

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

  findUser(user){
    return this.userModel.findOne(user)
  }
}
