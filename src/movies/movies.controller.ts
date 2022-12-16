import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Put,
  Body,
  Query,
  NotFoundException,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  constructor(readonly moviesSerivce: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesSerivce.getAll();
  }

  @Get(':id')
  getOne(@Param('id') movieId: string): Movie {
    const movie = this.moviesSerivce.getOne(movieId);
    if (!movie) {
      throw new NotFoundException(`Movice not Id ${movieId} not found.`);
    }

    return movie;
  }

  @Post()
  create(@Body() movieData) {
    return this.moviesSerivce.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: string) {
    this.getOne(movieId);
    this.moviesSerivce.deleteOne(movieId);
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return this.moviesSerivce.patch(movieId, updateData);
  }

  @Put(':id')
  put(@Param('id') movieId: string) {
    return `This will Put one movie with the id: ${movieId}`;
  }
}
