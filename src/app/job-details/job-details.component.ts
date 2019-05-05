import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { JobService } from '../services/job.service';

@Component({
  selector: 'cc-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  jobDetails = null;
  error = null;
  errorMessage = '';

  constructor(private jobService: JobService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log("this.activatedRoute.snapshot.params.id=======================>"+this.activatedRoute.snapshot.params.id);
    //console.log("this.activatedRoute.snapshot.params.id=======================>"+this.activatedRouteSnapshot.snapshot.params.id);
    const id = this.activatedRoute.snapshot.params.id;
    this.jobService.getJob(id).subscribe(
      data => {
        this.handerServerResponse(data);
      },
      error =>  {
        this.handleError(error);
      }
    );
  }
  handleError(error) {
    console.log('handleError: ', error.statusText);
    this.error = error;
  }

  handerServerResponse(response) {
    if(response.success ) {
      this.jobDetails = response.job;
    } else {
      this.errorMessage = response.message; 
    }
  }

}
