import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'mysql://u0begpax239nalnb:xyuNGIIxH5KvJsqoZTC0@bhmt8jx8utjlqeinh0nq-mysql.services.clever-cloud.com:3306/bhmt8jx8utjlqeinh0nq?reconnect=true',
        },
      },
    });
  }
}
