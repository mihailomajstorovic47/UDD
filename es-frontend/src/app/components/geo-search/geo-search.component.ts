import { SearchService } from './../../service/search.service';
import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-geo-search',
  templateUrl: './geo-search.component.html',
  styleUrls: ['./geo-search.component.scss']
})
export class GeoSearchComponent implements OnInit {

  content = {
    "city": "",
    "radius": ""
  }

  result = [
    {
      "id": "",
      "firstName": "",
      "lastName": "",
      "education": "",
      "highlight": "",
      "address": ""
    }
  ]

  constructor(private searchService: SearchService, private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  downloadCV(i){
    let dto = {
      "id": i,
      "isCV": true
    }

    this.registerService.download(dto).subscribe(
      (data: any) => {
        console.log(data)
        var file = new Blob([data], { type: 'application/pdf' })
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(file);
        link.download = 'applicant_cv.pdf';
        link.target = '_blank';
        link.click();        
      }
    )
  }

  downloadCL(i){
    let dto = {
      "id": i,
      "isCV": false
    }

    this.registerService.download(dto).subscribe(
      (data: any) => {
        console.log(data)
        var file = new Blob([data], { type: 'application/pdf' })
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(file);
        link.download = 'applicant_cl.pdf';
        link.target = '_blank';
        link.click();
      }
    )
  }

  submit(){
    this.searchService.geoSearch(this.content).subscribe(
      (data: any) => {
        this.result = data
        console.log(this.result)
        
        //console.log(data.status);
        ;
        
      }
    )
  }

}
