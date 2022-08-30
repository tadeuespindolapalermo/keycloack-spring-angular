import { TestBed } from '@angular/core/testing';

import { FooGuard } from './foo.guard';

describe('FooGuard', () => {
  let guard: FooGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FooGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
