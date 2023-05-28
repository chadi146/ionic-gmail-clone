import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MailPage } from './mail.page';

describe('MailPage', () => {
  let component: MailPage;
  let fixture: ComponentFixture<MailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
