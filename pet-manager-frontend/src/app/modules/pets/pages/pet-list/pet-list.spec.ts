import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PetListComponent } from './pet-list.component';
import { PetsFacade } from '../../state/pets.facade';
import { PetsService } from '../../services/pets.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockPetsFacade {
  pets$ = of([]);
  loading$ = of(false);
  loadPets() {}
}

class MockPetsService {
  uploadPhoto() { return of({}); }
}

describe('PetListComponent', () => {
  let component: PetListComponent;
  let fixture: ComponentFixture<PetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PetListComponent ], 
      imports: [ 
        ReactiveFormsModule,
        HttpClientTestingModule 
      ],
      providers: [
        FormBuilder,
        { provide: PetsFacade, useClass: MockPetsFacade },
        { provide: PetsService, useClass: MockPetsService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});