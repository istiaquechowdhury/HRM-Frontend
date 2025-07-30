import { Component } from '@angular/core';
import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form.component';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [EmployeeListComponent,EmployeeFormComponent],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.css'
})
export class EmployeePageComponent {
 onAdd() {
    console.log('Add clicked');
    // Later: Trigger add form logic
  }

  onEdit() {
    console.log('Edit clicked');
    // Later: Trigger edit logic based on selected employee
  }

  onDelete() {
    console.log('Delete clicked');
    // Later: Trigger delete logic
  }
}
