import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeetPage } from './meet.page';

describe('MeetPage', () => {
  let component: MeetPage;
  let fixture: ComponentFixture<MeetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MeetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
