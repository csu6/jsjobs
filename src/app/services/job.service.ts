import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class JobService {

  jobs = [];
  jobsSubject = new Subject();

  constructor(private http:HttpClient) { }

  getJobs() {
    return this.http.get<any[]>('data/jobs.json');          
  }

  addJob(jobData) {
    jobData.id = Date.now();
    return this.jobsSubject.next(jobData);
  }

}
