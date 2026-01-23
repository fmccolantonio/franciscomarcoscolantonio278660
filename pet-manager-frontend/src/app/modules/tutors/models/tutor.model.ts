export interface Tutor {
  id?: number;
  nome: string;
  telefone: string;
  email: string;
  pets?: any[]; // <--- Adicionamos isso para o erro sumir
}
