import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetsFacade } from '../../state/pets.facade';
import { PetsService } from '../../services/pets.service';
import { TutorsService } from '../../../tutors/services/tutors.service';
import { PetRequest } from '../../models/pet.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
  standalone: false
})
export class PetListComponent implements OnInit {
  petForm: FormGroup;
  showForm = false;
  isEditing = false;
  isReadOnly = false;
  selectedFile: File | null = null;
  currentPetId: number | null = null;
  currentPage = 0; 
  copied = false;
  
  currentTutors: any[] = [];

  constructor(
    public facade: PetsFacade,
    private petsService: PetsService,
    private tutorsService: TutorsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.petForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      especie: ['', Validators.required],
      raca: ['', [Validators.required, Validators.maxLength(100)]],
      idade: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadData();

    this.route.queryParams.subscribe(params => {
      const openPetId = params['openPetId'];
      if (openPetId) {
        this.petsService.getById(+openPetId).subscribe({
          next: (pet) => {
            this.onView(pet); 
            this.router.navigate([], {
              queryParams: { openPetId: null },
              queryParamsHandling: 'merge'
            });
          },
          error: () => console.error('Pet do link não encontrado')
        });
      }
    });
  }

  loadData() {
    this.facade.loadPets(this.currentPage, 10);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSearch(event: any) {
    const termo = event.target.value;
    this.currentPage = 0;
    this.facade.loadPets(0, 10, termo);
  }

  getSpeciesColor(especie: string): string {
    switch (especie?.toUpperCase()) {
      case 'CACHORRO': return 'bg-orange-500 text-white';
      case 'GATO': return 'bg-indigo-500 text-white';
      case 'OUTRO': return 'bg-emerald-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  }

  copyId() {
    if (this.currentPetId) {
      navigator.clipboard.writeText(this.currentPetId.toString());
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    }
  }

  goToTutor(tutorId: number) {
    if (tutorId) {
      this.onCancel();
      this.router.navigate(['/tutors'], { queryParams: { openTutorId: tutorId } }); 
    }
  }

  onNewPet() {
    this.isEditing = false;
    this.isReadOnly = false;
    this.currentPetId = null;
    this.currentTutors = [];
    this.petForm.enable();
    this.petForm.reset({ idade: 0, especie: '' });
    this.showForm = true;
    this.selectedFile = null;
  }

  onView(pet: any) {
    this.isEditing = true;
    this.isReadOnly = true;
    this.currentPetId = pet.id;
    this.currentTutors = [];
    
    this.petForm.patchValue({
      nome: pet.nome,
      especie: pet.especie,
      raca: pet.raca,
      idade: pet.idade
    });
    
    this.petForm.disable(); 
    this.showForm = true;
    this.selectedFile = null;

    this.petsService.getById(pet.id).subscribe(fullPet => {
      const p: any = fullPet;
      
      if (p.tutores && Array.isArray(p.tutores)) {
        this.currentTutors = p.tutores;
      }
    });
  }

  enableEditing() {
    this.isReadOnly = false;
    this.petForm.enable();
  }

  onDelete(id: number) {
    if (confirm('Tem certeza que deseja excluir este pet?')) {
      this.facade.deletePet(id);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files?.length) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.petForm.valid) {
      const dados: PetRequest = this.petForm.value;
      
      if (this.isEditing && this.currentPetId) {
        this.facade.updatePet(this.currentPetId, dados);
        if (this.selectedFile) {
          this.petsService.uploadFoto(this.currentPetId, this.selectedFile).subscribe({
            next: () => this.loadData()
          });
        }
        this.closeForm();
      } else {
        this.petsService.create(dados).subscribe({
          next: (novoPet) => {
            if (this.selectedFile && novoPet.id) {
              this.petsService.uploadFoto(novoPet.id, this.selectedFile).subscribe({
                next: () => { this.loadData(); this.closeForm(); },
                error: () => { this.loadData(); this.closeForm(); }
              });
            } else {
              this.loadData();
              this.closeForm();
            }
          },
          error: (err) => console.error('Erro ao criar pet', err)
        });
      }
    }
  }

  onCancel() {
    this.closeForm();
  }

  private closeForm() {
    this.showForm = false;
    this.petForm.reset();
    this.selectedFile = null;
    this.currentPetId = null;
    this.currentTutors = [];
    this.isReadOnly = false;
    this.petForm.enable();
  }
}