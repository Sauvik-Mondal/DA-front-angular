import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedBackListComponent } from './feed-back-list.component';

describe('FeedBackListComponent', () => {
  let component: FeedBackListComponent;
  let fixture: ComponentFixture<FeedBackListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedBackListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedBackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
