import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TutorsFacade } from '../../state/tutors.facade';
import { TutorsService } from '../../services/tutors.service';
import { TutorRequest } from '../../models/tutor.model';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.scss'],
  standalone: false
})
export class TutorListComponent implements OnInit {
  tutorForm: FormGroup;
  showForm = false;
  isEditing = false;
  isReadOnly = false; // Flag de leitura
  selectedFile: File | null = null;
  currentTutorId: number | null = null;
  currentPage = 0; 

  constructor(
    public facade: TutorsFacade,
    private tutorsService: TutorsService,
    private fb: FormBuilder
  ) {
    this.tutorForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required],
      cpf: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.facade.loadTutors(this.currentPage, 10);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSearch(event: any) {
    const termo = event.target.value;
    this.currentPage = 0; 
    this.facade.loadTutors(0, 10, termo);
  }

  // --- Ações ---

  onNewTutor() {
    this.isEditing = false;
    this.isReadOnly = false;
    this.currentTutorId = null;
    this.tutorForm.enable();
    this.tutorForm.reset();
    this.showForm = true;
    this.selectedFile = null;
  }

  // Visualizar Detalhes
  onView(tutor: any) {
    this.isEditing = true;
    this.isReadOnly = true;
    this.currentTutorId = tutor.id;
    
    this.tutorForm.patchValue({
      nome: tutor.nome,
      email: tutor.email,
      telefone: tutor.telefone,
      endereco: tutor.endereco,
      cpf: tutor.cpf
    });
    
    this.tutorForm.disable(); // Trava formulário
    this.showForm = true;
    this.selectedFile = null;
  }

  enableEditing() {
    this.isReadOnly = false;
    this.tutorForm.enable();
  }

  onDelete(id: number) {
    if (confirm('Tem certeza que deseja excluir este tutor?')) {
      this.facade.deleteTutor(id);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files?.length) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.tutorForm.valid) {
      const dados: TutorRequest = this.tutorForm.value;

      if (this.isEditing && this.currentTutorId) {
        this.facade.updateTutor(this.currentTutorId, dados);
        
        if (this.selectedFile) {
          this.tutorsService.uploadPhoto(this.currentTutorId, this.selectedFile).subscribe({
            next: () => this.loadData()
          });
        }
        this.closeForm();
      } else {
        this.tutorsService.create(dados).subscribe({
          next: (novoTutor) => {
            if (this.selectedFile && novoTutor.id) {
              this.tutorsService.uploadPhoto(novoTutor.id, this.selectedFile).subscribe({
                next: () => { this.loadData(); this.closeForm(); },
                error: () => { this.loadData(); this.closeForm(); }
              });
            } else {
              this.loadData();
              this.closeForm();
            }
          },
          error: (err) => console.error('Erro ao criar tutor', err)
        });
      }
    }
  }

  onCancel() {
    this.closeForm();
  }

  private closeForm() {
    this.showForm = false;
    this.tutorForm.reset();
    this.selectedFile = null;
    this.currentTutorId = null;
    this.isReadOnly = false;
    this.tutorForm.enable();
  }
}