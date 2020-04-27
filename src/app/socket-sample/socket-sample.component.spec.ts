import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketSampleComponent } from './socket-sample.component';

describe('SocketSampleComponent', () => {
  let component: SocketSampleComponent;
  let fixture: ComponentFixture<SocketSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SocketSampleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
