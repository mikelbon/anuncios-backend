import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/list-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({
      ...dto,
      password: hashedPassword,
      role: dto.role || UserRole.USER,
    });
    return this.userRepo.save(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepo.find();
    return users.map((user) => {
      const { id, name, email, role } = user;
      return { id, name, email, role };
    });
  }

  async findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'name'],
    });
  }

  async update(id: number, data: Partial<CreateUserDto>) {
    return this.userRepo.update(id, data);
  }

  async remove(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }

  async findAdsByUser(id: number) {
    return this.userRepo.findOne({
      where: { id },
      relations: ['ads'],
    });
  }
}
