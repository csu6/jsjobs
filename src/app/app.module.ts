import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { JobListComponent } from './job-list/job-list.component';

import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { JobService } from './services/job.service';
import { JobAddFormComponent } from './job-add-form/job-add-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DaysAgoPipe } from './pipes/days-ago.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    JobListComponent,
    JobAddFormComponent,
    DaysAgoPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule, HttpClientJsonpModule,
    ReactiveFormsModule
  ],
  providers: [JobService],
  bootstrap: [AppComponent]
})
export class AppModule { }
