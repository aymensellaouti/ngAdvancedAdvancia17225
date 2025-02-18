import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { getAllCvsResolver } from './get-all-cvs.resolver';

describe('getAllCvsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => getAllCvsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
