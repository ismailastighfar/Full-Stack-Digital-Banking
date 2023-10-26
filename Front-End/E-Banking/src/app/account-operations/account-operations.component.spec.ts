import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOperationsComponent } from './account-operations.component';

describe('AccountOperationsComponent', () => {
  let component: AccountOperationsComponent;
  let fixture: ComponentFixture<AccountOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
