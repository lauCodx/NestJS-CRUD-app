import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import { Model } from 'mongoose';

@Injectable()
export class BookService {

  constructor(@InjectModel(Book.name) private BookModel:Model<Book>){}

  async createbooks (createBookDto: CreateBookDto){
    const {title} = createBookDto

    const find = await this.BookModel.findOne({title: title.toLowerCase()})
    if(find){
      throw new BadRequestException('Book already exist!')
    }
    const book = await this.BookModel.create({
      createBookDto
    })

    return book;
  }
}
