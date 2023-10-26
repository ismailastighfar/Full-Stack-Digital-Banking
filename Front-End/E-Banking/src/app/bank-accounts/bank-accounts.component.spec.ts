import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountsComponent } from './bank-accounts.component';

describe('BankAccountsComponent', () => {
  let component: BankAccountsComponent;
  let fixture: ComponentFixture<BankAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
