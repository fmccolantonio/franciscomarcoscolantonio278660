import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { PetListComponent } from './pet-list.component';
import { PetsModule } from '../../pets.module';
import { PetsFacade } from '../../state/pets.facade';
import { PetsService } from '../../services/pets.service';

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
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        PetsModule
      ],
      providers: [
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