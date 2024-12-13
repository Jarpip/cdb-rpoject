import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { SystemComponent } from './system/system.component';
import { ProjectComponent } from './project/project.component';
import { SystemSearchComponent } from './system-search/system-search.component';
import { ProjectSearchComponent } from './project-search/project-search.component';
import { HolidayComponent } from './holiday/holiday.component';
import { HolidaySearchComponent } from './holiday-search/holiday-search.component';
import { OfficeSearchComponent } from './office-search/office-search.component';
import { OfficeComponent } from './office/office.component';
import { PositionSearchComponent } from './position-search/position-search.component';
import { PositionComponent } from './position/position.component';

import { NgxNumberFormatModule } from 'ngx-number-format';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { Routes , RouterModule} from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'main', component:  MainComponent, 
    children: [
      {
        path: 'system-search', component: SystemSearchComponent
      },
      {
        path: 'project-search', component: ProjectSearchComponent
      },
      {
        path: 'holiday-search', component: HolidaySearchComponent
      },
      {
        path: 'office-search', component: OfficeSearchComponent
      },
      {
        path: 'position-search', component:PositionSearchComponent
      },
      {
        path: 'system', component: SystemComponent
      },
      {
        path: 'project', component: ProjectComponent
      },
      {
        path: 'holiday', component: HolidayComponent
      },
      {
        path: 'office', component: OfficeComponent
      },
      {
        path: 'position', component: PositionComponent
      },
      {
        path: 'home', redirectTo: '/login'
      }
    ]
  },
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'sidenav', component: SidenavComponent},
  { path: 'header', component: HeaderComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    MainComponent,
    HeaderComponent,
    SystemComponent,
    ProjectComponent,
    SystemSearchComponent,
    ProjectSearchComponent,
    HolidayComponent,
    HolidaySearchComponent,
    OfficeSearchComponent,
    OfficeComponent,
    PositionSearchComponent,
    PositionComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    MatCardModule,
    MatTableModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSelectModule,
    MatRadioModule,
    NgxNumberFormatModule
  ],
  exports: [RouterModule],
  providers: [{provide: LOCALE_ID, useValue: "th-TH"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
