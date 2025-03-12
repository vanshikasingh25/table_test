import { TestBed } from '@angular/core/testing';

import { AttackTableService } from './attack-table.service';

describe('AttackTableService', () => {
  let service: AttackTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttackTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
