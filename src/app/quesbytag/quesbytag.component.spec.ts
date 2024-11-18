import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuesbytagComponent } from './quesbytag.component';

describe('QuesbytagComponent', () => {
  let component: QuesbytagComponent;
  let fixture: ComponentFixture<QuesbytagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuesbytagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuesbytagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
