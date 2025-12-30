import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { PrismaService } from '../prisma/prisma.service';

describe('GameController', () => {
  let controller: GameController;
  let service: GameService;

  beforeEach(async () => {
    const mockGameService = {
      getAllGamesList: jest
        .fn()
        .mockResolvedValue([{ id: 1, name: 'Test Game' }]),
      getGamesByQuery: jest
        .fn()
        .mockResolvedValue([{ id: 2, name: 'Queried Game' }]),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [
        { provide: GameService, useValue: mockGameService },
        { provide: PrismaService, useClass: PrismaService },
      ],
    }).compile();

    controller = module.get<GameController>(GameController);
    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('GetAllGamesList should return all games', async () => {
    const result: { id: number; name: string }[] = await controller.getGames({});
    expect(result).toEqual([{ id: 1, name: 'Test Game' }]);
    expect(service.getAllGamesList).toHaveBeenCalled();
  });
});
