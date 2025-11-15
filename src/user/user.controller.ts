import {
  Controller,
  Body,
  Post,
  Get,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.service.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
