import { MediaService } from './media.service';
import { PrismaModule } from './../prisma/prisma.module';
import {Module} from '@nestjs/common'
import { MediaController } from './media.controller';
import { HttpExceptionFilter } from './../../core/http-exception.filter.';
import { APP_FILTER } from '@nestjs/core'; 

@Module({
    imports:  [PrismaModule],
    controllers: [MediaController],
    providers: [MediaService,
        { 
            provide: APP_FILTER, 
            useClass: HttpExceptionFilter, 
          }, 
    ]
})

export class MediaModule{}
