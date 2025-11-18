import {
  Controller,
  Body,
  Post,
  Get,
  Put,
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: Partial<CreateUserDto>) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.service.remove(id);
  }

  @Get(':id/ads')
  async findAdsByUser(@Param('id') id: number) {
    const user = await this.service.findAdsByUser(+id);
    if (!user) {
      return { message: 'Usuario no encontrado' };
    }
    return user.ads;
  }
}
