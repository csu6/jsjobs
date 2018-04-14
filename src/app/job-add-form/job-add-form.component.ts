import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobService } from '../services/job.service';

@Component({
  selector: 'cc-job-add-form',
  templateUrl: './job-add-form.component.html',
  styleUrls: ['./job-add-form.component.css']
})
export class JobAddFormComponent implements OnInit {

  form: FormGroup;

  contractTypes = [
    {id: 1, name: 'Stage', value: 'internship'},
    {id: 2, name: 'Intérim', value: 'temp'},
    {id: 3, name: 'Contrat à durée déterminée (CDD)', value: 'fixed-term'},
    {id: 4, name: 'Contrat à durée Indéterminée', value: 'permanent'},
    {id: 5, name: 'Indépendant', value: 'freelance'}
  ];

  currencies = [
    {id: 1, name: 'euros', value: 'EUR', symbol: '€'},
    {id: 2, name: 'livres sterling', value: 'POUNS', symbol: '£'},
    {id: 3, name: 'francs', value: 'CFA', symbol: 'CFA'},
    {id: 4, name: 'dollars canadien', value: 'EUR', symbol: '$'}
  ];

  statuses = [
    {id: 1, name: 'cadre', value: 'executive'},
    {id: 2, name: 'employé', value: 'employee'}
  ];

  experience = [
    {id: 1, name: 'junior', value: 'junior'},
    {id: 2, name: 'medior', value: 'medior'},
    {id: 3, name: 'senior', value: 'senior'}
  ];

  areas = [
    {id: 1, name: 'Aucun déplacement', value: 'none'},
    {id: 2, name: 'Déplacement régionaux', value: 'region'},
    {id: 3, name: 'Déplacement nationaux', value: 'nation'},
    {id: 4, name: 'Déplacement internationaux', value: 'international'}
  ];

  constructor(private formBuilder: FormBuilder,
  private  jobService: JobService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        id: -1,
        title: '',
        company: '',
        city: '',
        zipcode: 75,
        description: '',
        contract: '',
        salary: null,
        currency: ' ',
        startdate: new Date(),
        experience: '',
        status: '',
        area: '',
        field: '',
        publishdate: new Date(),
        lastupdate: new Date()
    });
  }

  createJob(jobData) {
    console.log(this.form.value);
    console.log(jobData);
    this.jobService.addJob(jobData);
  }

}
