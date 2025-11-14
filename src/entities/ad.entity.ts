// src/entities/ad.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum AdCategory {
  DEPARTAMENTO = 'departamento',
  COCHERA = 'cochera',
  SERVICIO = 'servicio',
  ARTICULO = 'articulo',
}

@Entity()
export class Ad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  category: 'departamento' | 'cochera' | 'servicio' | 'articulo';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  contact: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp' })
  expiresAt: Date;
}
