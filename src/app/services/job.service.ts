import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable()
export class JobService {

  constructor(private http:HttpClient) { }

  getJobs() {
    return this.http.get<any[]>('data/jobs.json');          
  }

}
