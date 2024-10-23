import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('api')
export class BookController {
  constructor(private  bookService: BookService) {}

  @Post('createBook')
  createBook (@Body() createBookDto: CreateBookDto){
    return this.bookService.createbooks(createBookDto)
  }

}
