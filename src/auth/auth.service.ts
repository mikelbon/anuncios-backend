import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwt: JwtService,
  ) {}

  async register(data: { email: string; password: string; name: string }) {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = this.repo.create({ ...data, password: hashed });
    await this.repo.save(user);
    return { message: 'Usuario registrado con éxito' };
  }

  async login(data: { email: string; password: string }) {
    const user = await this.repo.findOneBy({ email: data.email });
    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new Error('Credenciales inválidas');
    }
    const token = this.jwt.sign({ sub: user.id, email: user.email });
    return { access_token: token };
  }

  async validateUser(id: number) {
    return this.repo.findOneBy({ id });
  }
}}
