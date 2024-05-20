import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVcardComponent } from './modal-vcard.component';

describe('ModalVcardComponent', () => {
  let component: ModalVcardComponent;
  let fixture: ComponentFixture<ModalVcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalVcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
