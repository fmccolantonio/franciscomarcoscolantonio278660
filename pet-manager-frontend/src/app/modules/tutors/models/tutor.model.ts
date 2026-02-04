import { Page } from '../../../core/models/pagination.model';
import { Pet } from '../../pets/models/pet.model'; 

export interface TutorFoto {
  id: number;
  nome: string;
  contentType: string;
  url: string;
}

export interface Tutor {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: string;
  foto?: TutorFoto;
  pets?: Pet[]; 
}

export interface TutorResponse extends Page<Tutor> {}

export interface TutorRequest {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: string;
}