import { Page } from '../../../core/models/pagination.model';
import { Pet } from '../../pets/models/pet.model';

export interface Tutor {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: number; // O schema define como int64. No front, converteremos.
  foto?: {
    id: number;
    nome: string;
    contentType: string;
    url: string;
  };
  pets?: Pet[]; // Lista de pets vinculados
}

export interface TutorResponse extends Page<Tutor> {}

export interface TutorRequest {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: number;
}