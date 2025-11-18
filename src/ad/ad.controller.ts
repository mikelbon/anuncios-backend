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
import {  UpdateAdDto} from './dto/update-ad.dto';
import { CreateAdDto } from './dto/create-ad.dto';

@Controller('ads')
export class AdController {
  constructor(private readonly service: AdService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateAdDto, @Request() req) {
    return this.service.create(dto);
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
  update(@Param('id') id: number, @Body() dto: UpdateAdDto) {
    return this.service.update(id, dto);
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
