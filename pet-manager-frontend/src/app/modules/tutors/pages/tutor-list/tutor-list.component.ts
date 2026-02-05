import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  isReadOnly = false;
  selectedFile: File | null = null;
  currentTutorId: number | null = null;
  currentPage = 0;
  
  selectedTutor: any = null;
  petIdToLink: string = '';

  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | 'warning' = 'success';

  showConfirmModal = false;
  petIdToUnlink: number | null = null;

  constructor(
    public facade: TutorsFacade,
    private tutorsService: TutorsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tutorForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      endereco: ['', Validators.required],
      cpf: ['', Validators.required],
      petId: ['']
    });
  }

  ngOnInit(): void {
    this.loadData();

    this.route.queryParams.subscribe(params => {
      const openTutorId = params['openTutorId'];
      if (openTutorId) {
        this.tutorsService.getById(+openTutorId).subscribe({
          next: (tutor) => {
            this.onView(tutor);
            this.router.navigate([], {
              queryParams: { openTutorId: null },
              queryParamsHandling: 'merge'
            });
          },
          error: () => console.error('Tutor não encontrado')
        });
      }
    });
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

  showFeedback(message: string, type: 'success' | 'error' | 'warning') {
    this.feedbackMessage = message;
    this.feedbackType = type;
    setTimeout(() => {
      this.feedbackMessage = '';
    }, 4000);
  }

  formatCpf(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }

    this.tutorForm.get('cpf')?.setValue(value);
  }

  formatPhone(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    }

    this.tutorForm.get('telefone')?.setValue(value);
  }

  private applyCpfMask(cpf: string | number): string {
    if (!cpf) return '';
    let value = String(cpf).replace(/\D/g, '');
    while (value.length < 11) value = '0' + value;
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  private applyPhoneMask(phone: string): string {
    if (!phone) return '';
    let value = phone.replace(/\D/g, '');
    if (value.length === 11) {
      return value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    if (value.length === 10) {
      return value.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return phone;
  }

  linkPet() {
    if (!this.petIdToLink || !this.currentTutorId) return;
    
    const petId = Number(this.petIdToLink);
    const tutorId = this.currentTutorId;

    if (this.selectedTutor?.pets && this.selectedTutor.pets.some((p: any) => p.id === petId)) {
      this.showFeedback('Este Pet já está vinculado a este Tutor!', 'warning');
      return;
    }

    this.tutorsService.linkPet(tutorId, petId).subscribe({
      next: () => {
        this.showFeedback('Pet vinculado com sucesso!', 'success');
        this.petIdToLink = '';
        this.refreshSelectedTutor(tutorId);
      },
      error: (err) => {
        console.error(err);
        if (err.status === 404) {
          this.showFeedback('Pet não encontrado.', 'error');
        } else {
          this.showFeedback('Erro ao vincular.', 'error');
        }
      }
    });
  }

  onUnlinkPet(petId: number) {
    this.petIdToUnlink = petId;
    this.showConfirmModal = true;
  }

  confirmUnlink() {
    if (!this.currentTutorId || !this.petIdToUnlink) return;

    this.tutorsService.unlinkPet(this.currentTutorId, this.petIdToUnlink).subscribe({
      next: () => {
        this.showFeedback('Vínculo removido.', 'success');
        this.refreshSelectedTutor(this.currentTutorId!);
        this.closeConfirmModal();
      },
      error: (err) => {
        console.error(err);
        this.showFeedback('Erro ao desvincular.', 'error');
        this.closeConfirmModal();
      }
    });
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
    this.petIdToUnlink = null;
  }

  private refreshSelectedTutor(tutorId: number) {
    this.tutorsService.getById(tutorId).subscribe(tutor => {
      this.selectedTutor = tutor;
      this.facade.loadTutors(this.currentPage, 10);
    });
  }

  goToPet(petId: number) {
    this.onCancel();
    this.router.navigate(['/pets'], { queryParams: { openPetId: petId } });
  }

  onNewTutor() {
    this.selectedTutor = null;
    this.isEditing = false;
    this.isReadOnly = false;
    this.currentTutorId = null;
    this.petIdToLink = '';
    this.feedbackMessage = '';
    this.tutorForm.enable();
    this.tutorForm.reset();
    this.showForm = true;
    this.selectedFile = null;
  }

  onView(tutor: any) {
    this.isEditing = true;
    this.isReadOnly = true;
    this.currentTutorId = tutor.id;
    this.petIdToLink = '';
    this.feedbackMessage = '';
    
    const maskedCpf = this.applyCpfMask(tutor.cpf);
    const maskedPhone = this.applyPhoneMask(tutor.telefone);

    this.tutorForm.patchValue({
      nome: tutor.nome,
      email: tutor.email,
      telefone: maskedPhone,
      endereco: tutor.endereco,
      cpf: maskedCpf,
      petId: ''
    });
    
    this.tutorForm.disable();
    this.showForm = true;
    this.selectedFile = null;

    this.tutorsService.getById(tutor.id).subscribe({
      next: (fullTutor) => {
        this.selectedTutor = fullTutor;
      },
      error: (err) => console.error(err)
    });
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
    if (this.tutorForm.invalid) {
      this.tutorForm.markAllAsTouched();
      this.showFeedback('Preencha os campos obrigatórios.', 'warning');
      return;
    }

    const formValues = this.tutorForm.value;
    
    const cleanCpf = formValues.cpf ? formValues.cpf.replace(/\D/g, '') : '';
    const cleanPhone = formValues.telefone ? formValues.telefone.replace(/\D/g, '') : '';

    const tutorData: TutorRequest = {
      nome: formValues.nome,
      email: formValues.email,
      telefone: cleanPhone, 
      endereco: formValues.endereco,
      cpf: Number(cleanCpf)
    };

    const petIdToLink = formValues.petId ? Number(formValues.petId) : null;

    if (this.isEditing && this.currentTutorId) {
      this.facade.updateTutor(this.currentTutorId, tutorData);
      
      if (this.selectedFile) {
        this.tutorsService.uploadPhoto(this.currentTutorId, this.selectedFile).subscribe();
      }
      
      if (petIdToLink) {
        this.tutorsService.linkPet(this.currentTutorId, petIdToLink).subscribe();
      }
      
      this.showFeedback('Tutor atualizado!', 'success');
      setTimeout(() => { this.loadData(); this.closeForm(); }, 1000);

    } else {
      this.tutorsService.create(tutorData).subscribe({
        next: (novoTutor) => {
          if (this.selectedFile && novoTutor.id) {
            this.tutorsService.uploadPhoto(novoTutor.id, this.selectedFile).subscribe();
          }

          if (petIdToLink && novoTutor.id) {
            this.tutorsService.linkPet(novoTutor.id, petIdToLink).subscribe();
          }
          
          this.showFeedback('Tutor criado com sucesso!', 'success');
          setTimeout(() => { this.loadData(); this.closeForm(); }, 1000);
        },
        error: (err) => {
          console.error(err);
          this.showFeedback('Erro ao criar tutor.', 'error');
        }
      });
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
    this.selectedTutor = null;
    this.feedbackMessage = '';
  }
}