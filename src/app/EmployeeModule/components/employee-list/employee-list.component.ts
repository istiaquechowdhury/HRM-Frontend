import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { EmployeeDTO } from '../../models/employee.dto';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitter, Output } from '@angular/core';
import { EmployeeDetailsDTO } from '../../models/employeeDetails';
import { DropdownService } from '../../services/dropdown.service';
import { BaseDropdownDto } from '../../models/dropdowndto';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';






@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [EmployeeService]
})

export class EmployeeListComponent implements OnInit {
  employees: EmployeeDTO[] = [];
  filteredEmployees: EmployeeDTO[] = [];
  designationList: string[] = [];
  selectedDesignation: string = 'All';

  departments: BaseDropdownDto[] = [];
  sections: BaseDropdownDto[] = [];
  designations: BaseDropdownDto[] = [];
  reportingmanagers: BaseDropdownDto[] = [];
  jobTypes: BaseDropdownDto[] = [];
  employeeTypes: BaseDropdownDto[] = [];
  genders: BaseDropdownDto[] = [];
  religions: BaseDropdownDto[] = [];
  weekOffs: BaseDropdownDto[] = [];
  maritalStatuses: BaseDropdownDto[] = [];
  relationships: BaseDropdownDto[] = [];


  employeeForm!: FormGroup;
  selectedImageFile!: File;
  
  isCreatingNew: boolean = false;


selectedEmployee: EmployeeDetailsDTO = {} as EmployeeDetailsDTO;


   @Output() employeeSelected = new EventEmitter<number>();

  loading = true;
  error = '';

  constructor(private employeeService: EmployeeService,private router: Router,private dropdownService: DropdownService,private fb: FormBuilder) {}

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
    this.loadDropdowns();
    
  this.initializeForm();
  this.loadDropdowns();
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

    getGenderName(id: number): string {
    const gender = this.genders.find(g => g.id === id);
    return gender ? gender.text : 'Unknown';
  }

  getRelationshipName(id: number): string {
    const relationship = this.relationships.find(r => r.id === id);
    return relationship ? relationship.text : 'Unknown';
  }





  loadDropdowns(): void {
  const clientId = 10001001; // replace with actual IdClient value

  this.dropdownService.getDepartments(clientId).subscribe(data => {
    this.departments = data;
  });

  this.dropdownService.getSections(clientId).subscribe(data => {
    this.sections = data;
  });


  this.dropdownService.getDesignations(clientId).subscribe(data => {
    this.designations = data;
  });

   this.dropdownService.getReportingManagers(clientId).subscribe(data => {
    this.reportingmanagers = data;
  });


    this.dropdownService.getJobTypes(clientId).subscribe(data => {
    this.jobTypes = data;
  });

  this.dropdownService.getEmployeeTypes(clientId).subscribe(data => {
    this.employeeTypes = data;
  });

  this.dropdownService.getGenders(clientId).subscribe(data => {
    this.genders = data;
  });

  this.dropdownService.getReligions(clientId).subscribe(data => {
    this.religions = data;
  });

  this.dropdownService.getWeekOffs(clientId).subscribe(data => {
    this.weekOffs = data;
  });

  this.dropdownService.getMaritalStatuses(clientId).subscribe(data => {
    this.maritalStatuses = data;
  });

  this.dropdownService.getRelationships(clientId).subscribe(data => {
    this.relationships = data;
  });


  

}





viewEmployeeDetails(id: number): void {
  this.employeeService.getEmployeeById(id).subscribe({
    next: (data) => {
      this.selectedEmployee = data;
    },
    error: (err) => {
      console.error('Error fetching employee:', err);
    }
  });
}



initializeForm(): void {
  this.employeeForm = this.fb.group({
    idClient: [10001001],
    employeeName: [null, Validators.required],
    employeeNameBangla: [null],
    employeeImage: [null],
    fatherName: [null],
    motherName: [null],
    idReportingManager: [null],
    idJobType: [null],
    idEmployeeType: [null],
    birthDate: [null],
    joiningDate: [null],
    idGender: [null],
    idReligion: [null],
    idDepartment: [null],
    idSection: [null],
    idDesignation: [null],
    hasOvertime: [false],
    hasAttendenceBonus: [false],
    idWeekOff: [null],
    address: [null],
    presentAddress: [null],
    nationalIdentificationNumber: [null],
    contactNo: [null],
    idMaritalStatus: [null],
    isActive: [true],
    createdBy: ['system'],

    documents: this.fb.array([]),
    educationInfos: this.fb.array([]),
    professionalCertification: this.fb.array([]),
    employeeFamilyInfos: this.fb.array([]),
  });
}



get documents(): FormArray {
  return this.employeeForm.get('documents') as FormArray;
}

get educationInfos(): FormArray {
  return this.employeeForm.get('educationInfos') as FormArray;
}

get professionalCertification(): FormArray {
  return this.employeeForm.get('professionalCertification') as FormArray;
}

get employeeFamilyInfos(): FormArray {
  return this.employeeForm.get('employeeFamilyInfos') as FormArray;
}

onAddNew(): void {
  this.isCreatingNew = true;
  this.selectedEmployee = {
    idClient: 10001001,
    isActive: true,
    employeeName: ''
    // other default values if needed
  } as EmployeeDetailsDTO;
}



onSave(): void {
   console.log(this.selectedEmployee.idDepartment);
  this.employeeService.createEmployee(this.selectedEmployee).subscribe({
    next: () => {
      alert('Employee created successfully!');
      this.isCreatingNew = false;
      this.selectedEmployee = {} as EmployeeDetailsDTO;
      this.ngOnInit(); // Reload employee list
    },
    error: (err) => {
      console.error('Create failed', err);
      alert('Error creating employee');
    }
  });
}





  






}










