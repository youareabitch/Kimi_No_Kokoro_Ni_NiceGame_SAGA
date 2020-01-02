import { TestBed } from '@angular/core/testing';

import { FormBuildService } from './form-build.service';

describe('FormBuildService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormBuildService = TestBed.get(FormBuildService);
    expect(service).toBeTruthy();
  });
});
