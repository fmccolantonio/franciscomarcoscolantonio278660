import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetsFacade } from '../../state/pets.facade';
import { Pet } from '../../models/pet.models';

@Component({
  selector: 'app-pet-list',
  standalone: false,
  templateUrl: './pet-list.component.html', // <--- CORREÇÃO: O caminho é simples assim
  styles: []
})
export class PetListComponent implements OnInit {
  
  petForm: FormGroup;

  constructor(
    public facade: PetsFacade,
    private fb: FormBuilder
  ) {
    this.petForm = this.fb.group({
      nome: ['', Validators.required],
      especie: ['', Validators.required],
      raca: ['', Validators.required],
      idade: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.facade.loadPets();
  }

  onSubmit() {
    if (this.petForm.valid) {
      const novoPet: Pet = this.petForm.value;
      this.facade.addPet(novoPet);
      this.petForm.reset();
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }
}