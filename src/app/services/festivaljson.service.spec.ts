import { TestBed } from '@angular/core/testing';

import { FestivaljsonService } from './festivaljson.service';

describe('FestivaljsonService', () => {
  let service: FestivaljsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FestivaljsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
