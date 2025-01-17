import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOneComponent } from './test-one.component';

describe('TestOneComponent', () => {
  let component: TestOneComponent;
  let fixture: ComponentFixture<TestOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
