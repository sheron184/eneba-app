import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

import 'dotenv/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const prismaMariaDb = new PrismaMariaDb({
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT
        ? parseInt(process.env.DATABASE_PORT, 10)
        : 3306,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      allowPublicKeyRetrieval: true,
      ssl: false,
    });
    super({ adapter: prismaMariaDb });
  }
}
