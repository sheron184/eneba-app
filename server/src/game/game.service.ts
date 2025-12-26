import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {
    //
  }
  async getGamesByQuery(query?: string, offset: number = 0): Promise<any> {
    await this.prisma.game
      .findMany({
        where: {
          title: {
            contains: query,
          },
        },
        skip: Number(offset),
        take: 5,
      })
      .then((payload) => {
        return {
          data: payload,
          count: payload.length,
          status: 'success',
        };
      })
      .catch((error: unknown) => {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';
        return {
          data: [],
          count: 0,
          status: 'error',
          message: errorMessage,
        };
      });
  }
  async getAllGamesList(offset: number): Promise<any> {
    return this.prisma.game.findMany({
      skip: Number(offset),
      take: 5,
    });
  }
}
