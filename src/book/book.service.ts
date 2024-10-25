import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import { Model } from 'mongoose';
import { NotFoundError } from 'rxjs';

@Injectable()
export class BookService {

  constructor(@InjectModel(Book.name) private BookModel:Model<Book>){}

  async createbooks (createBookDto: Partial< CreateBookDto> & {createdBy: string}) {
    const {title, createdBy} = createBookDto

    if (!title){
      throw new BadRequestException('Title is required')
    }

    const find = await this.BookModel.findOne({title: title.toLowerCase()})
    if(find){
      throw new BadRequestException('Book already exist!')
    }
    const book = await this.BookModel.create({
      ...createBookDto,
      createdBy
    })

    return book;
  };

  async showBooks(userId: string){

    const findBook = await this.BookModel.find({createdBy: userId})

    return findBook;
  }

  async getASinglkeBook(id: string){
    const book = await this.BookModel.findById({_id:id})

    if(!book){
      throw new NotFoundException('Book not found')
    }
    return book;
  }
}
