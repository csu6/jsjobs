import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { Subject, Observable } from 'rxjs/Rx';

@Injectable()
export class JobService {

  initialJobs = [];
  jobs = [];
  jobsSubject = new Subject();

  BASE_URL = 'http://localhost:4201/';


  constructor(private http:HttpClient) { }


  getJobs() {
    return this.http.get<any[]>(this.BASE_URL + 'api/jobs');   
/*
    // on a à la fois des données de jobs.json + des données ajoutées par notre formulaire
    if(this.jobs.length > 0   && this.initialJobs.length>0) {
      console.log('case if');
        return Observable.of([...this.jobs, ...this.initialJobs])
    } else if(this.jobs.length>0 && this.initialJobs.length === 0)  {
      console.log('case else if');
      return this.http.get<any[]>(this.BASE_URL + 'api/jobs')
      .do(data => { 
        this.initialJobs = data;
        this.jobs = [...this.jobs, this.initialJobs]
       });     
    } else {
    console.log('case else');
    return this.http.get<any[]>(this.BASE_URL + 'api/jobs')
                .do(data => this.initialJobs = data );     
    }
*/
  }

  addJob(jobData) {
    jobData.id = Date.now();
    // this.jobs = [jobData, ...this.jobs];
    // return this.jobsSubject.next(jobData);
    return this.http.post(this.BASE_URL + 'api/jobs', jobData)
                .map(res => {
                  console.log(res);
                  this.jobsSubject.next(jobData);
                })
  }

  getJob(id) {
    return this.http.get(this.BASE_URL + `api/jobs/${id}`);
  }

}
