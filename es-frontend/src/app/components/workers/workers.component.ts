import { RegisterService } from './../../service/register.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {

  constructor(private registerService:  RegisterService) { }

  result = [
    {
      "name": "",
      "address": "",
      "education": "",
      "id": ""
    }
  ]

  company = 1

  ngOnInit(): void {
    this.registerService.getAll().subscribe(
      (data: any) => {
        this.result = data
      }
    )
  }

  selectCompany($event){
    this.company = $event.target.value
  }


  hire(id){
    let employee = localStorage.getItem('id')

    var dto = {
      "applicantId": id,
      "companyId": this.company,
      "employeeId": employee
    }

    this.registerService.hire(dto).subscribe(
      (data: any) => {
        alert("Applicant has been successfully hired!")
      }
    )

  }

  

}
