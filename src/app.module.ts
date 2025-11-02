import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdModule } from './ad/ad.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AdModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'condominio_db',
    entities: [Ad, User],
    synchronize: true,
  })
})
export class AppModule {}
