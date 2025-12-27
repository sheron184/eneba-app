import { Controller, Get, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { ListAllGamesDto } from './dto/game.dto';

@Controller('list')
export class GameController {
  constructor(private readonly gameService: GameService) {
    //
  }

  @Get()
  getGamesByQuery(@Query() query: ListAllGamesDto): Promise<any> {
    if (query && typeof query.search === 'string') {
      console.log('Search Query:', query.search);
      return this.gameService.getGamesByQuery(query.search, query.offset ?? 0);
    }
    return this.gameService.getAllGamesList(query.offset ?? 0);
  }
}
