import { TestBed } from '@angular/core/testing';

import { PlayerNameService } from './player-name.service';

describe('PlayerNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayerNameService = TestBed.get(PlayerNameService);
    expect(service).toBeTruthy();
  });
});
