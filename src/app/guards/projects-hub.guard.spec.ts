import { TestBed } from '@angular/core/testing';

import { ProjectsHubGuard } from './projects-hub.guard';

describe('ProjectsHubGuard', () => {
  let guard: ProjectsHubGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProjectsHubGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
