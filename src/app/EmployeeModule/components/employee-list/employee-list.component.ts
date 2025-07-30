import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { EmployeeDTO } from '../../models/employee.dto';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [EmployeeService]
})

export class EmployeeListComponent implements OnInit {
  employees: EmployeeDTO[] = [];
  filteredEmployees: EmployeeDTO[] = [];
  designationList: string[] = [];
  selectedDesignation: string = 'All';

  loading = true;
  error = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.filteredEmployees = data;
        this.designationList = ['All', ...new Set(data.map(e => e.designationName || 'N/A'))];
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load employees';
        this.loading = false;
      }
    });
  }

  onDesignationChange(): void {
    if (this.selectedDesignation === 'All') {
      this.filteredEmployees = this.employees;
    } else {
      this.filteredEmployees = this.employees.filter(
        emp => (emp.designationName || 'N/A') === this.selectedDesignation
      );
    }
  }
}










