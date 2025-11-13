import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ad } from '../entities/ad.entity';
import { addMonths } from 'date-fns';

@Injectable()
export class AdService {
  constructor(@InjectRepository(Ad) private repo: Repository<Ad>) {}

  create(ad: Partial<Ad>) {
    const now = new Date();
    const expiresAt = ad.expiresAt ?? addMonths(now, 1); // 1 mes por defecto
    return this.repo.save({ ...ad, createdAt: now, expiresAt });
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  update(id: number, ad: Partial<Ad>) {
    return this.repo.update(id, ad);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
