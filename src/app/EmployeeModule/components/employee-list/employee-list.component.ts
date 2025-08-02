import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDTO } from '../../models/employee.dto';
import { EmployeeDetailsDTO } from '../../models/employeeDetails';
import { CommonModule } from '@angular/common';
import { EmployeeEducationInfosDTO } from '../../models/EmployeeEducationInfosDTO ';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [EmployeeService]
})
export class EmployeeListComponent implements OnInit {

  employees: EmployeeDTO[] = [];
  filteredEmployees: EmployeeDTO[] = [];

  designationList: string[] = [];
  selectedEmployeeId: number | null = null;

  employeeForm!: FormGroup;
  filterForm!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadEmployees();

    this.filterForm = this.fb.group({
      selectedDesignation: ['']
    });

            this.filterForm.get('selectedDesignation')?.valueChanges.subscribe(selected => {
        if (!selected) {
          this.filteredEmployees = [...this.employees]; // Show all if "All" is selected
        } else {
          this.filteredEmployees = this.employees.filter(e => e.designationName === selected);
        }
      });
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data;

      // Unique designation list
       this.designationList = [...new Set(data.map(e => e.designationName).filter(d => d !== null))].sort() as string[];
    });
  }
   
  applyFilter(selected: string) {
    if (selected) {
      this.filteredEmployees = this.employees.filter(emp => emp.designationName === selected);
    } else {
      this.filteredEmployees = this.employees;
    }
  }

  onAddNew() {
    this.selectedEmployeeId = null;
    this.buildForm(); // empty form
  }

  viewEmployeeDetails(id: number) {
    this.employeeService.getEmployeeById(id).subscribe(data => {
      this.selectedEmployeeId = id;
      this.buildForm(data);
    });
  }

  buildForm(employee?: EmployeeDetailsDTO) {
    this.employeeForm = this.fb.group({
      employeeName: [employee?.employeeName || '', Validators.required],
      fatherName: [employee?.fatherName || '', [Validators.required, Validators.email]],
      
      // Add other basic fields

      // Nested: Education Info
      employeeEducationInfos: this.fb.array(
        employee?.employeeEducationInfos?.map(e => this.buildEducationForm(e)) || []
      ),

      // Nested: Documents
      employeeDocument: this.fb.array(
        employee?.employeeDocuments?.map(d => this.buildDocumentForm(d)) || []
      ),

      // Nested: Family Info
      employeeFamilyInfo: this.fb.array(
        employee?.employeefamilyInfos?.map(f => this.buildFamilyForm(f)) || []
      ),

      // Nested: Certifications
      employeeProfessionalCertification: this.fb.array(
        employee?.employeeProfessionalCertifications?.map(c => this.buildCertificationForm(c)) || []
      ),
    });
  }

  buildEducationForm(e: Partial<EmployeeEducationInfosDTO> = {}): FormGroup {

    return this.fb.group({
      cgpa: [e.cgpa || '', Validators.required],
      examscale: [e.examScale || ''],
      marks: [e.marks || ''],
      major: [e.major || ''],
      passingYear: [e.passingYear],
      instituteName: [e.instituteName],
      isForeignInstitute: [e.instituteName],
      duration: [e.duration],
      achievement : [e.achievement]


    });
  }

  buildDocumentForm(d: any = {}): FormGroup {
    return this.fb.group({
      documentType: [d.documentType || '', Validators.required],
      documentUrl: [d.documentUrl || '']
    });
  }

  buildFamilyForm(f: any = {}): FormGroup {
    return this.fb.group({
      name: [f.name || '', Validators.required],
      relationship: [f.relationship || ''],
      age: [f.age || '']
    });
  }

  buildCertificationForm(c: any = {}): FormGroup {
    return this.fb.group({
      certificationName: [c.certificationName || '', Validators.required],
      issuingOrganization: [c.issuingOrganization || '']
    });
  }

  // Helpers to access FormArrays
  get educationInfos(): FormArray {
    return this.employeeForm.get('employeeEducationInfos') as FormArray;
  }

  get documents(): FormArray {
    return this.employeeForm.get('employeeDocument') as FormArray;
  }

  get familyInfos(): FormArray {
    return this.employeeForm.get('employeeFamilyInfo') as FormArray;
  }

  get certifications(): FormArray {
    return this.employeeForm.get('employeeProfessionalCertification') as FormArray;
  }



  onSubmit() {
  if (this.employeeForm.valid) {
    const payload = this.employeeForm.value;
    this.employeeService.createEmployee(payload).subscribe({
      next: res => {
        alert('Employee saved!');
        this.loadEmployees(); // Refresh list
      },
      error: err => {
        console.error(err);
        alert('Failed to save employee');
      }
    });
  }
}
}
