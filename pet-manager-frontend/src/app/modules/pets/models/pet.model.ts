import { Page } from '../../../core/models/pagination.model';

export interface PetFoto {
  id: number;
  nome: string;
  contentType: string;
  url: string;
}

export interface Pet {
  id: number;
  nome: string;
  raca: string;
  idade: number;
  foto?: PetFoto;
  // O endpoint de detalhes pode trazer tutores
  tutores?: any[];
}

// Resposta paginada da API (GET /v1/pets)
export interface PetResponse extends Page<Pet> {}

// Para cadastro e edição (POST/PUT)
export interface PetRequest {
  nome: string;
  raca: string;
  idade: number;
}