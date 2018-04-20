import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operator/map';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JobService {

  initialJobs = [];
  jobs = [];
  jobsSubject = new Subject();

  BASE_URL = 'http://localhost:4201/';

  constructor(private http:HttpClient) { }

  getJobs() {
    // cas 1: on a à la fois des données jobs.json + des données ajoutés  par notre formulaire
    // cas 2: on n'a pas encore récupéré de données
    // cas 3: on a des jobs récupérés de jobs.json
    /*
    if (
      this.jobs.length > 0
      &&
      this.initialJobs.length > 0
    ) {
      return Observable.of([...this.jobs, ...this.initialJobs]);
    } else if(this.jobs.length > 0 && this.initialJobs.length === 0) {
      return this.http.get<any[]>(this.BASE_URL + 'api/jobs')
                      .do(data => {
                        this.initialJobs = data;
                        this.jobs = [...this.jobs, ...this.initialJobs];
                        });
    } else {
      return this.http.get<any[]>(this.BASE_URL + 'api/jobs')
                      .do(data => this.initialJobs = data);
    }
    */
    return this.http.get<any[]>(this.BASE_URL + 'api/jobs');
  }

  addJob(jobData) {
    console.log("Post data:");
    jobData.id = Date.now();
    //this.jobs = [jobData, ...this.jobs];
    //return this.jobsSubject.next(jobData); 
    return this.http.post(this.BASE_URL + 'api/jobs', jobData)
                    .map(res => {
                      this.jobsSubject.next(jobData);
                    });
  }

  getJob(id) {
    return this.http.get( this.BASE_URL + `api/jobs/${id}`);
                    //.map(res => res.json());
  }

  searchJob(criteria) {
    console.log(criteria);
    return this.http.get(`${this.BASE_URL}api/search/${criteria.term}/${criteria.place}`);

  }

}
