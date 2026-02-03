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
  especie: string; 
  raca: string;
  idade: number;
  foto?: PetFoto;
  
  tutores?: any[];
}


export interface PetResponse extends Page<Pet> {}


export interface PetRequest {
  nome: string;
  especie: string; 
  raca: string;
  idade: number;
}