import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Request } from '@nestjs/common';
import { addMonths } from 'date-fns';
import { AdService } from './ad.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('ads')
export class AdController {
  constructor(private readonly service: AdService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() ad, @Request() req) {
    return this.service.create(ad);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() ad) {
    return this.service.update(id, ad);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
  @Put(':id/extend')
  extend(@Param('id') id: number) {
    const extraMonth = addMonths(new Date(), 1);
    return this.service.update(id, { expiresAt: extraMonth });
  }
}
