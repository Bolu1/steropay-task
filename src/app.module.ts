import { Module } from '@nestjs/common';
import { MediaModule } from './media/media.module'
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    
    ConfigModule.forRoot({isGlobal:true,}), 
    MediaModule, PrismaModule],
})
export class AppModule {}
