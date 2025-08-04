import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeDTO } from '../../models/employee.dto';
import { EmployeeDetailsDTO } from '../../models/employeeDetails';
import { CommonModule } from '@angular/common';
import { EmployeeEducationInfosDTO } from '../../models/EmployeeEducationInfosDTO ';
import { DropdownService } from '../../services/dropdown.service';
import { BaseDropdownDto } from '../../models/dropdowndto';
import { EmployeeDocumentDTO } from '../../models/employeedocumentdto';
import { EmployeeFamilyInfoDTO } from '../../models/employeefamililyinfodto';
import { EmployeeProfessionalCertificationDTO } from '../../models/employeeprofessionalcerdto';

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
  departments: BaseDropdownDto[] = [];
  sections : BaseDropdownDto[] = [];
  designations : BaseDropdownDto[] = [];
  employeetypes : BaseDropdownDto[] = [];
  jobtypes : BaseDropdownDto [] = [];
  genders : BaseDropdownDto [] = [];
  religions : BaseDropdownDto[] = [];
  maritalstatuses : BaseDropdownDto[] = [];
  weekoffs : BaseDropdownDto[] = [];
  reportingmanagers : BaseDropdownDto[] = [];
  relationships : BaseDropdownDto[] = []




  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private dropdownservice : DropdownService
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
    this.loadDropdowns();
      
  }

  loadDropdowns()
  {
      const IdClient = 10001001;
      this.dropdownservice.getDepartments(IdClient).subscribe(res => {
      this.departments = res;
    });

     this.dropdownservice.getSections(IdClient).subscribe(res => {
      this.sections = res;
    });

     this.dropdownservice.getDesignations(IdClient).subscribe(res => {
      this.designations = res;
    });

     this.dropdownservice.getEmployeeTypes(IdClient).subscribe(res => {
      this.employeetypes = res;
    });

    this.dropdownservice.getJobTypes(IdClient).subscribe(res => {
      this.jobtypes = res;
    });

     this.dropdownservice.getGenders(IdClient).subscribe(res => {
      this.genders = res;
    });


     this.dropdownservice.getReligions(IdClient).subscribe(res => {
      this.religions = res;
    });

     this.dropdownservice.getMaritalStatuses(IdClient).subscribe(res => {
      this.maritalstatuses = res;
    });


    this.dropdownservice.getWeekOffs(IdClient).subscribe(res => {
      this.weekoffs = res;
    });

     this.dropdownservice.getReportingManagers(IdClient).subscribe(res => {
      this.reportingmanagers = res;
    });



     this.dropdownservice.getRelationships(IdClient).subscribe(res => {
      this.relationships = res;
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
      employeeNameBangla: [employee?.employeeNameBangla || '', Validators.required],
      fatherName: [employee?.fatherName || '', [Validators.required, Validators.email]],
      motherName : [employee?.motherName || '',[Validators.required,]],
      birthDate: [employee?.birthDate || '',[Validators.required,]],
      joiningDate:[employee?.joiningDate || '',[Validators.required,]],
      contactNo: [employee?.contactNo || '',[Validators.required,]],
      nationaalIdentificationNumber: [employee?.nationalIdentificationNumber|| '', [Validators.required]],
      address:[employee?.address|| '',[Validators.required]],
      PresentAddress:[employee?.presentAddress || '',[Validators.required]],
      hasOvertime : [employee?.hasOvertime || '',[Validators.required,]],
      hasAttendenceBonus :[employee?.hasAttendenceBonus || '',[Validators.required,]],
      isActive :[employee?.isActive || '',[Validators.required,]],
      employeeImageExtension :[employee?.employeeImageExtension || '',[Validators.required,]],
      idDepartment :[employee?.idDepartment || '',[Validators.required,]],
      idSection :[employee?.idSection || '',[Validators.required,]],
      idDesignation :[employee?.idDesignation || '',[Validators.required,]],
      idEmployeeType :[employee?.idEmployeeType || '',[Validators.required,]],
      idJobType :[employee?.idJobType || '',[Validators.required,]],
      idGender : [employee?.idGender || '',[Validators.required,]],
      idReligion : [employee?.idReligion || '',[Validators.required,]],
      idMaritalStatus : [employee?.idMaritalStatus || '',[Validators.required,]],
      idWeekOff: [employee?.idWeekOff || '',[Validators.required,]],
      idReportingManager: [employee?.idReportingManager || '',[Validators.required,]],
      createdby: [employee?.createdBy || '',[Validators.required,]],
      setdate : [employee?.setDate || '', [Validators.required]],
      employeeImageBase64 : [employee?.employeeImageBase64 || '', [Validators.required]],







      








      
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

  buildDocumentForm(d:Partial<EmployeeDocumentDTO>): FormGroup {
    return this.fb.group({
      documentName: [d.documentName || '', Validators.required],
      filename: [d.fileName || ''],
      uploadDate: [d.uploadDate || ''],
      uploadedFileExtention: [d.uploadedFileExtention || ''],
      uploadedFileBase64: [d.uploadedFileBase64 || ''],




    });
  }

  buildFamilyForm(f: Partial<EmployeeFamilyInfoDTO>): FormGroup {
    return this.fb.group({
      name: [f.name || '', Validators.required],
      idGender: [f.idGender || ''],
      idRelationship: [f.idRelationship || ''],
      dateOfBirth: [f?.dateOfBirth || ''],
      contactNo: [f?.contactNo || ''],
      currentAddress: [f?.currentAddress || ''],
      permanentAddress: [f?.permanentAddress || ''],



    });
  }

  buildCertificationForm(c: Partial<EmployeeProfessionalCertificationDTO>): FormGroup {
    return this.fb.group({
      certificationTitle: [c.certificationTitle || '', Validators.required],
      certificationInstitute: [c.certificationInstitute || ''],
      instituteLocation: [c.instituteLocation || ''],
      fromDate: [c.fromDate || ''],
      toDate: [c.toDate || ''],
      
        



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


onImageSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1]; // get only base64 string
      const extension = file.type.split('/')[1]; // like "jpeg", "png"

      this.employeeForm.patchValue({
        employeeImageBase64: base64,
        employeeImageExtension: extension
      });
    };

    reader.readAsDataURL(file); // triggers onload
  }
}




}
