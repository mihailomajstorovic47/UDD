import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'es-frontend';

  constructor(private router: Router){}

  basicSearch(){
    this.router.navigate(['/search']);
  }


  advancedSearch(){
    this.router.navigate(['/advancedSearch']);
  }

  geoSearch(){
    this.router.navigate(['/geoSearch']);

  }

  statistic(){
    this.router.navigate(['/statistic']);
  }


  register(){
    this.router.navigate(['/register']);
  }

  workers(){
    this.router.navigate(['/workers'])
  }

  login(){
    this.router.navigate(['']);
  }
}
