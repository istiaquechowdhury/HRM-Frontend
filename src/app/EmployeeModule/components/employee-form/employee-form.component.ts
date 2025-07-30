import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent {


  employee = {
    employeeName: '',
    designation: '',
    email: '',
    phone: ''
  };

  designationList = ['Manager', 'Developer', 'Designer']; // You can customize this

  onSubmit() {
  console.log("Employee form submitted:",);
  // You can later replace this with an actual service call

  
}
}
