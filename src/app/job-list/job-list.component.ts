import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { JobService } from  '../services/job.service';

@Component({
  selector: 'cc-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobs: any[];
  error = '';

  constructor(private http: HttpClient, private jobservice: JobService) { }

  ngOnInit() {

    /* this.jobservice.getJobs().pipe(
      map((res) => {
        console.log("-------------------");
        console.log(res);
        //this.jobs = res;
      })
    ).subscribe(data => {console.log("-------------------");
    console.log(data);});
    */
      this.jobservice.getJobs().subscribe(res => {
        this.jobs = res;
      },
      error => {
        console.error(error);
        this.error = error;
      }
    );

    this.jobservice.jobsSubject.subscribe(data => {
      console.log("subscribe : ");
      console.log(data);
      this.jobs = [data,...this.jobs];
    });
  }

}
