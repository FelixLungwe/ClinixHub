import { TestBed } from '@angular/core/testing';

import { ClinixGuard } from './clinix.guard';

describe('ClinixGuard', () => {
  let guard: ClinixGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClinixGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
