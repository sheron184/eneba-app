/**
 * GameDTO
 * {
      "id": 6,
      "title": "Red Dead Redemption 2",
      "image": "red_dead_redemption_2.jpg",
      "price": 59.99,
      "discountedPrice": 39.99,
      "discountPercent": 33,
      "cashbackAmount": 3.5,
      "platform": "Xbox Series X|S",
      "region": "EUROPE",
      "publisher": "Rockstar Games",
      "genre": "Action Adventure",
      "releaseDate": "2018-10-26T00:00:00.000Z",
      "description": "Epic Western open-world adventure.",
      "rating": 4.9,
      "stock": 100,
      "createdAt": "2025-12-27T00:35:02.179Z"
    }
 */

export interface GameDTO {
  id: number;
  title: string;
  image: string;
  price: number;
  discountedPrice: number;
  discountPercent: number;
  cashbackAmount: number;
  platform: string;
  region: string;
  publisher: string;
  genre: string;
  releaseDate: string;
  description: string;
  rating: number;
  stock: number;
  createdAt: string;
}

export interface GameListResponseDTO {
  data: GameDTO[];
  count: number;
  status: string;
}