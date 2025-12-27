import axiosInstance from "./config.axios";

// Utility function to handle errors
import { AxiosError } from "axios";
import { GameDTO, GameListResponseDTO } from "./game.dto";

type ApiResponse<T> = T | { error: string };

const handleApiError = (error: AxiosError): { error: string } => {
  if (error.response) {
    // Server responded with a status other than 2xx
    console.error("API Error:", error.response.data);
    return { error: error.message || "An error occurred while fetching data." };
  } else if (error.request) {
    // Request was made but no response received
    console.error("Network Error:", error.message);
    return { error: "Network error. Please try again later." };
  } else {
    // Something else happened
    console.error("Unexpected Error:", error.message);
    return { error: "An unexpected error occurred." };
  }
};

const listAllGames = async (): Promise<ApiResponse<GameDTO[]>> => {
  try {
    const response = await axiosInstance.get<GameListResponseDTO>("/list");
    return response.data.data;
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
}

const findGame = async (query: string): Promise<ApiResponse<GameDTO[]>> => {
  try {
    const response = await axiosInstance.get<GameListResponseDTO>(`/list?search=${query}`);
    return response.data.data;
  } catch (error) {
    return handleApiError(error as AxiosError);
  }
}

export { listAllGames, findGame };