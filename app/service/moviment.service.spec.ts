import { TestBed } from '@angular/core/testing';

import { MovimentService } from './moviment.service';

describe('MovimentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovimentService = TestBed.get(MovimentService);
    expect(service).toBeTruthy();
  });
});
