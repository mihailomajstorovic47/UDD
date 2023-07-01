import { StatisticComponent } from './components/statistic/statistic.component';
import { LoginComponent } from './components/login/login.component';
import { WorkersComponent } from './components/workers/workers.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { GeoSearchComponent } from './components/geo-search/geo-search.component';
import { SearchComponent } from './components/search/search.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'search',
    component: SearchComponent,
  },

  {
    path: 'geoSearch',
    component: GeoSearchComponent,
  },

  {
    path: 'advancedSearch',
    component: AdvancedSearchComponent,
  },

  {
    path: 'workers',
    component: WorkersComponent,
  },

  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full', 

  },

  {
    path: 'statistic',
    component: StatisticComponent,

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
