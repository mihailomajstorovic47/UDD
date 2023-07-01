import { RegisterService } from './../../service/register.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = {
    "firstName": "",
    "lastName": "",
    "education": "",
    "street": "",
    "city": "",
  }

  cv: any
  coverLetter: any
  result = [
    {
      "firstName": "",
      "lastName": "",
      "education": "",
      "highlight": ""
    }
  ]
  
  constructor(private registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(){

    const formData: FormData = new FormData();
    formData.append('firstName', this.user.firstName);
    formData.append('lastName', this.user.lastName);
    formData.append('education', this.user.education);
    formData.append('street', this.user.street);
    formData.append('city', this.user.city);
    formData.append('cv', this.cv);
    formData.append('coverLetter', this.coverLetter);

    this.registerService.register(formData).subscribe(
      (data: any) => {
        this.result = data
        console.log(this.result)
        this.router.navigate(['/workers'])

      }
    )
  }

  addCV(cv){
    const file: File = cv.target.files[0];
    this.cv = file
    console.log(this.user.firstName)
  }

  addCL(cl){
    const file: File = cl.target.files[0];
    this.coverLetter = file;
  }


  educationLevel($event){
    var level = $event.target.value

    if(level == 1){
      this.user.education = "I"
    }
    else if(level == 2){
      this.user.education = "II"
    }
    else if(level == 3){
      this.user.education = "III"
    }
    else if(level == 4){
      this.user.education = "IV"
    }
    else if(level == 5){
      this.user.education = "V"
    }
    else if(level == 6){
      this.user.education = "VI"
    }
    else if(level == 7){
      this.user.education = "VII"
    }
    else if(level == 8){
      this.user.education = "VIII"
    }
  }

}
