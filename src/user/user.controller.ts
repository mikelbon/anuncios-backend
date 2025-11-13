import { Controller } from '@nestjs/common';
import { Body, Post, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
    constructor(private readonly service: UserService){}

    @Post()
    async create(@Body() dto: CreateUserDto){
        return this.service.create(dto);
    }

    @Get()
    async findAll(){
        return this.service.findAll();
    }
}
