import { TestBed, inject } from '@angular/core/testing';

import { ProductHuntService } from './product-hunt.service';

describe('ProductHuntService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductHuntService]
    });
  });

  it('should be created', inject([ProductHuntService], (service: ProductHuntService) => {
    expect(service).toBeTruthy();
  }));
});
