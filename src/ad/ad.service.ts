import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Ad } from '../entities/ad.entity';
import { addMonths } from 'date-fns';
import { UpdateAdDto } from './dto/update-ad.dto';
import { CreateAdDto } from './dto/create-ad.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class AdService {
  constructor(
    @InjectRepository(Ad) private adRepo: Repository<Ad>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(ad: CreateAdDto) {
    const now = new Date();
    const expiresAt = ad.expiresAt ?? addMonths(now, 1);

    const user = await this.userRepo.findOne({
      where: { email: ad.contact },
    });
    if(!user){
      throw new NotFoundException('Usuario no encontrado con ese contacto');
    }

    const newAd = this.adRepo.create({
      title: ad.title,
      description: ad.description,
      category: ad.category,
      price: ad.price,
      contact: ad.contact,
      createdAt: now,
      expiresAt,
      user
    });
    return this.adRepo.save(newAd);
  }

  findAll() {
    return this.adRepo.find();
  }

  findOne(id: number) {
    return this.adRepo.findOneBy({ id });
  }

  async update(id: number, ad: UpdateAdDto) {
    await this.adRepo.update(id, ad);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.adRepo.delete(id);
  }
}
