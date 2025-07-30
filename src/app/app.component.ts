import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeListComponent } from './EmployeeModule/components/employee-list/employee-list.component';
import { CommonModule } from '@angular/common';
import { EmployeePageComponent } from './EmployeeModule/Pages/employee-page/employee-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,EmployeeListComponent,CommonModule,EmployeePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HRM-Frontend';
}
