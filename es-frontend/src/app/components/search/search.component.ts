import { RegisterService } from './../../service/register.service';
import { SearchService } from './../../service/search.service';
import { Component, OnInit } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  content = ""
  phrase = false
  criteria = 0
  result = [
    {
      "firstName": "",
      "lastName": "",
      "education": "",
      "highlight": "",
      "id": ""
    }
  ]
  showLevel = false
  showPhrase = false

  constructor(private searchService: SearchService, private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  selectField($event){
    this.criteria = $event.target.value
    if(this.criteria == 2){
      this.showLevel = true
    }
    else{
      this.showLevel = false
    }
    if (this.criteria != 3 && this.criteria != 4) {
      this.showPhrase = false
      this.phrase = false
    }
    else {
      this.showPhrase = true
    }
  }

  educationLevel($event){
    this.content = $event.target.value
  }

  selectPhrase(){
    if(this.phrase){
      this.phrase = true
    }
    else{
      this.phrase = false;
    }
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

    var content = {
      "content": this.content,
      "phrase": this.phrase
    }
    console.log(content)

    if(this.criteria == 1){
      this.searchService.simpleSearch(content).subscribe(
        (data: any) => {
          this.result = data
          console.log(this.result)
        }
      )
    }
    else if(this.criteria == 2){
      this.searchService.educationSearch(content).subscribe(
        (data: any) => {
          this.result = data
          console.log(this.result)
        }
      )
    }
    else if(this.criteria == 3){
      this.searchService.CVSearch(content).subscribe(
        (data: any) => {
          this.result = data
          console.log(this.result)
        }
      )
    }
    else if(this.criteria == 4){
      this.searchService.CLSearch(content).subscribe(
        (data: any) => {
          this.result = data
          console.log(this.result)
        }
      )
    }
  }

}
