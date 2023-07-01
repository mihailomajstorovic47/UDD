import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { GeoSearchComponent } from './components/geo-search/geo-search.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { WorkersComponent } from './components/workers/workers.component';
import { LoginComponent } from './components/login/login.component';
import { StatisticComponent } from './components/statistic/statistic.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SearchComponent,
    GeoSearchComponent,
    AdvancedSearchComponent,
    WorkersComponent,
    LoginComponent,
    StatisticComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
