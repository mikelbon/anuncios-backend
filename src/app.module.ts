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
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'mysql',
    database: 'condominio_db',
    entities: [Ad, User],
    synchronize: true,
  })
})
export class AppModule {}
