import { TestBed } from '@angular/core/testing';

import { BackdropSpinnerService } from './backdrop-spinner.service';

describe('BackdropSpinnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackdropSpinnerService = TestBed.get(BackdropSpinnerService);
    expect(service).toBeTruthy();
  });
});
