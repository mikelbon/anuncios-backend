import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/list-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
      const user = this.repo.create({
    ...dto,
    password: hashedPassword,
  });
  return this.repo.save(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.repo.find();
    return users.map((user) => {
      const { id, name, email } = user;
      return { id, name, email };
    });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.repo.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'name'],
    });
  }
}
