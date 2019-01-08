import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotsCategoryListComponent } from './lots-category-list.component';

describe('LotsCategoryListComponent', () => {
  let component: LotsCategoryListComponent;
  let fixture: ComponentFixture<LotsCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotsCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotsCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
