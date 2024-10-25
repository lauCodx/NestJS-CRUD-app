import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from 'src/middleware/auth.guard';
import { AuthUser } from 'src/interface/user.interface';

@UseGuards(AuthGuard)
@Controller('api')
export class BookController {
  constructor(private  bookService: BookService) {}

  @Post('createBook')
  createBook (@Body() createBookDto: CreateBookDto, @Req() req:AuthUser){
    const userId = req.user._id
    return this.bookService.createbooks({
      ...createBookDto,
      createdBy: userId
    })

  }

  @Get('getBooks')
  getBooks(@Req() req:AuthUser){
    const userId= req.user._id
    const books = this.bookService.showBooks(userId)
    return books
  }

  @Get('getABook/:id')
  getABook(@Param('id') id:string, @Req() req:AuthUser){
    const userId = req.user._id;

    if(!userId){
      throw new UnauthorizedException("Not authorized to Access this book")
    }
    return this.bookService.getASinglkeBook(id)
  }

}
