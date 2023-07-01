import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  name = ""

  ngOnInit(): void {
  }

  login(){
    if(this.name === "Milos Markovic"){
      localStorage.setItem('id', "1");
      alert("Logged in successfuly !")
    }
    else if(this.name === "Petar Markovic"){
      localStorage.setItem('id', "2");
      alert("Logged in successfuly !")
    }
    else {
      alert("Wrong credentials. Please, try again.")
    }
  }

}
