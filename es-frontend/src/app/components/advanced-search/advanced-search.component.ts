import { RegisterService } from './../../service/register.service';
import { SearchService } from './../../service/search.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {

  constructor(private searchService: SearchService, private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  education = false
  fieldCount = 0
  
  fields = [
    { 
      criteria: '',
      content: '',
      op : 'AND',
      phrase: false
    }];
    result = [
      {
        "firstName": "",
        "lastName": "",
        "education": "",
        "highlight": "",
        "address": "",
        "id": ""
      }
    ]

  addField() {

    this.fieldCount = this.fields.length + 1;
    const newField = { criteria: '', content: '', op: 'AND', phrase: false };
    this.fields.push(newField);

    this.submit()

  }

  removeField(index: number) {
    this.fieldCount = this.fields.length - 1;
    this.fields.splice(index, 1);
    this.submit()
  }

  operator($event, index){
    this.fields[index].op = $event.target.value
    this.fields[0].op = this.fields[1].op

    console.log(this.fields[index])
  }

  criteria($event, index){
    let selected = $event.target.value
    if(selected === "education"){
      this.education = true
    }else{
      this.education = false
    }
    this.fields[index].criteria = selected
  
    console.log(this.fields[index])
  }

  educationLevel($event, index){
    this.fields[index].content = $event.target.value
    console.log(this.fields[index])
  }

  selectPhrase(index, $event){
    if($event.target.checked){
      this.fields[index].phrase = true
    }else{
      this.fields[index].phrase = false

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

  submit() {
    console.log(JSON.stringify(this.fields));
    this.fields[0].op = this.fields[1].op

    this.searchService.advancedSearch(JSON.stringify(this.fields)).subscribe(
      (data: any) => {
        this.result = data
        console.log(data)
      }
    )
  }

}
