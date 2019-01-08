import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotsListComponent } from './lots-list.component';

describe('LotsListComponent', () => {
  let component: LotsListComponent;
  let fixture: ComponentFixture<LotsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
