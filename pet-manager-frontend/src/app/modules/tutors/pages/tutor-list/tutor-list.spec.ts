import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TutorListComponent } from './tutor-list.component';
import { TutorsModule } from '../../tutors.module'; 

describe('TutorListComponent', () => {
  let component: TutorListComponent;
  let fixture: ComponentFixture<TutorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TutorsModule 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});