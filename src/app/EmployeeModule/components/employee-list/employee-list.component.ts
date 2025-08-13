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
  fileToUpload: File | null = null;

  selectedImageFile: File | null = null;

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
  educationlevels: BaseDropdownDto[] = []; 
  educationexaminations: BaseDropdownDto[] = []; 
  educationresults: BaseDropdownDto[] = [];

  isReadonly = false;


  
   
  
  idClient: number = 0;


  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private dropdownservice : DropdownService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.idClient = 10001001;
    this.buildForm();
    

    
      // this.buildForm();


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


    
     this.dropdownservice.getEducationLevels(IdClient).subscribe(res => {
      this.educationlevels = res;
    });


      this.dropdownservice.getEducationExaminations(IdClient).subscribe(res => {
      this.educationexaminations = res;
    });


      this.dropdownservice.getEducationResult(IdClient).subscribe(res => {
      this.educationresults = res;
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
    this.buildForm();
    this.buildEducationForm();
    this.buildCertificationForm();
    this.buildDocumentForm();
    this.buildFamilyForm();
    this.isReadonly = false;
      
    
  }


  viewEmployeeDetails(id: number) {
    this.employeeService.getEmployeeById(id).subscribe(data => {
      this.selectedEmployeeId = id;

      this.buildForm(data);

      // Patch the image base64 and extension to the form after buildForm
      this.employeeForm.patchValue({
        employeeImageBase64: data.employeeImageBase64 || '',
        employeeImageExtension: data.employeeImageExtension
          ? data.employeeImageExtension.replace('image/', '') // remove mime type if present
          : 'jpeg' // fallback if none present
      });

      this.employeeForm.disable();
      this.isReadonly = true;
    });
  }

onEdit(id: number) {
  this.selectedEmployeeId = id;

  this.employeeService.getEmployeeById(id).subscribe(data => {
    this.buildForm(data);


   
    // Make sure both id and IdClient are in the form
    this.employeeForm.patchValue({
      
      employeeImageBase64: data.employeeImageBase64 || '',
      employeeImageExtension: data.employeeImageExtension
        ? data.employeeImageExtension.replace('image/', '')
        : 'jpeg'
    });

    this.employeeForm.enable();
    this.isReadonly = false;
  });
}



  //   onEdit(id: number) {
  //   if (!this.selectedEmployeeId) return;

  //   // Enable the form for editing
  //   this.employeeForm.enable();

  //   // Mark readonly flag as false (editing mode)
  //   this.isReadonly = false;
  // }



  buildForm(employee?: EmployeeDetailsDTO) {

     console.log('on edit', employee );
    this.employeeForm = this.fb.group({
      id: [employee?.id || null],
      IdClient: [employee?.idClient || this.idClient],
      employeeName: [employee?.employeeName || '',],
      employeeNameBangla: [employee?.employeeNameBangla || '',],
      fatherName: [employee?.fatherName || '',],
      motherName : [employee?.motherName || '',],
      birthDate: employee?.birthDate ? this.formatDateForInput(employee?.birthDate) : '',
      joiningDate: employee?.joiningDate ? this.formatDateForInput(employee?.joiningDate) : '',
      contactNo: [employee?.contactNo || '',],
      nationalIdentificationNumber: [employee?.nationalIdentificationNumber|| '',],
      address:[employee?.address|| '',],
      PresentAddress:[employee?.presentAddress || '',],
      hasOvertime : [employee?.hasOvertime || '',],
      hasAttendenceBonus :[employee?.hasAttendenceBonus || '',],
      isActive :[employee?.isActive || '',],
      idDepartment :[employee?.idDepartment || '', [Validators.required],],
      idSection :[employee?.idSection || '',[Validators.required] ],
      idDesignation :[employee?.idDesignation || '',],
      idEmployeeType :[employee?.idEmployeeType || '',],
      idJobType :[employee?.idJobType || '',],
      idGender : [employee?.idGender || '',],
      idReligion : [employee?.idReligion || '',],
      idMaritalStatus : [employee?.idMaritalStatus || '',],
      idWeekOff: [employee?.idWeekOff || '',],
      idReportingManager: [employee?.idReportingManager || '',],
      createdby: [employee?.createdBy || '',],
      setdate : [employee?.setDate || '', ],
      employeeImage: [null], // <-- file object
      employeeImageBase64: [employee?.employeeImageBase64 || '',],
      employeeImageExtension: [employee?.employeeImageExtension || ''],

      
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
      id: [e.id || null], 
      IdClient : [this.idClient],
      idEducationLevel: [e.idEducationLevel,Validators.required],
      idEducationExamination: [e.idEducationExamination,Validators.required],
      idEducationResult: [e.idEducationResult,Validators.required],
      cgpa: [e.cgpa || '',],
      examscale: [e.examScale || ''],
      marks: [e.marks || '',],
      major: [e.major || '',Validators.required],
      passingYear: [e.passingYear,Validators.required],
      instituteName: [e.instituteName,Validators.required],
      isForeignInstitute: [e.isForeignInstitute,Validators.required],
      duration: [e.duration],
      achievement : [e.achievement]



    });
  }

  buildDocumentForm(d:Partial<EmployeeDocumentDTO> = {}): FormGroup {
    return this.fb.group({
      id: [d.id ?? null],
      IdClient: [d.idClient || this.idClient],
      documentName: [d.documentName || '',Validators.required,],
      filename: [d.fileName || '',Validators.required],
      uploadDate: [
      d.uploadDate ? this.formatDateForInput(d.uploadDate) : '',Validators.required],

      uploadedFileExtention: [d.uploadedFileExtention || ''],
      uploadedFileBase64: [d.uploadedFileBase64 || ''],




    });
  }

  buildFamilyForm(f: Partial<EmployeeFamilyInfoDTO> = {}): FormGroup {
    return this.fb.group({
      id: [f.id || null],
      IdClient : [this.idClient],
      name: [f.name || '',],
      idGender: [f.idGender || ''],
      idRelationship: [f.idRelationship || ''],
      dateOfBirth: f.dateOfBirth ? this.formatDateForInput(f.dateOfBirth) : '',
      contactNo: [f?.contactNo || ''],
      currentAddress: [f?.currentAddress || ''],
      permanentAddress: [f?.permanentAddress || ''],



    });
  }

  buildCertificationForm(c: Partial<EmployeeProfessionalCertificationDTO> = {}): FormGroup {
    return this.fb.group({
      id: [c.id || null],
      IdClient : [this.idClient],
      certificationTitle: [c.certificationTitle || '',Validators.required],
      certificationInstitute: [c.certificationInstitute || '',Validators.required],
      instituteLocation: [c.instituteLocation || '',Validators.required],
      fromDate: [c.fromDate ? this.formatDateForInput(c.fromDate) : '',Validators.required],
      toDate: c.toDate ? this.formatDateForInput(c.toDate) : '',



    });
  }

  // Helpers to access FormArrays
  get educationInfos(): FormArray {
    return this.employeeForm.get('employeeEducationInfos') as FormArray;


  }

    addEducation(): void {
    const eduForm = this.fb.group({
      id: [null],
      IdClient: [this.idClient],                         // number
      idEducationLevel: [null,Validators.required],                          // number
      idEducationExamination: [null,Validators.required],                    // number
      idEducationResult: [null,Validators.required],                         // number
      cgpa: [null],                                      // decimal
      examscale: [null],                                 // decimal
      marks: [null],                                     // decimal
      major: ['',Validators.required],                                       // string
      passingYear: [null,Validators.required],                               // decimal (or number if year)
      instituteName: ['',Validators.required],                               // string
      isForeignInstitute: [null,Validators.required],                       // boolean
      duration: [null],                                  // decimal
      achievement: ['']                                  // string
    });

    this.educationInfos.push(eduForm);
  }


    removeEducation(index: number): void {
      this.educationInfos.removeAt(index);
    }


    get documents(): FormArray {
      return this.employeeForm.get('employeeDocument') as FormArray;
    }

        addDocument(): void {
          const docForm = this.fb.group({
            id: [null],
            IdClient: [this.idClient],                  // number
            documentName: ['',Validators.required],                           // string
            filename: ['',Validators.required],                               // string
            uploadDate: ['',Validators.required],
            uploadedFileExtention: [''],                  // string
            uploadedFileBase64: ['']                       // string (base64 encoded file content)
          });

        this.documents.push(docForm);
      }

      removeDocument(index: number): void {
        this.documents.removeAt(index);
      }



      get familyInfos(): FormArray {
        return this.employeeForm.get('employeeFamilyInfo') as FormArray;
      }

      addFamilyInfo(): void {
      const familyForm = this.fb.group({
        id: [null],
        IdClient: [this.idClient],            // number
        name: ['',Validators.required],                           // string
        idGender: [null,Validators.required],                     // number
        idRelationship: [null,Validators.required],               // number
        dateOfBirth: [null],                  // Date or ISO string
        contactNo: [''],                      // string
        currentAddress: [''],                 // string
        permanentAddress: ['']                // string
      });
      this.familyInfos.push(familyForm);
    }


      removeFamilyInfo(index: number): void {
        this.familyInfos.removeAt(index);
      }


        get certifications(): FormArray {
          return this.employeeForm.get('employeeProfessionalCertification') as FormArray;
        }

    addCertification(): void {
      const certForm = this.fb.group({
        id: [null],
        IdClient: [this.idClient],           // number
        certificationTitle: ['',Validators.required],             // string
        certificationInstitute: ['',Validators.required],         // string
        instituteLocation: ['',Validators.required],              // string
        fromDate: [null,Validators.required],                     // Date or ISO string
        toDate: [null]                       // Date or ISO string
      });

      this.certifications.push(certForm);
    }

    removeCertification(index: number): void {
      this.certifications.removeAt(index);
    }


  onSubmit() {
 
    
  const formData = new FormData();

   this.employeeForm.markAllAsTouched(); // Mark all fields as touched to trigger validation UI

  if (this.employeeForm.invalid) {
    return; // Stop submission if form is invalid
  }

  // Append scalar fields (exclude FormArrays)
  Object.keys(this.employeeForm.controls).forEach(key => {
    const control = this.employeeForm.get(key);
    if (control && !(control instanceof FormArray) && key !== 'employeeEducationInfos') {
      // Append only if value is not null/undefined to avoid string 'null'
      const val = control.value;
      if (val !== null && val !== undefined) {
        formData.append(key, val);
      }
    }
  });


  // Append employeeEducationInfos FormArray as JSON string, convert strings to numbers where needed
  const educationArray = this.employeeForm.get('employeeEducationInfos') as FormArray;
  if (educationArray && educationArray.length > 0) {
    const educations = educationArray.value.map((edu: any) => ({
      ...edu,
      id: edu.id ?? null,                    // existing record id
      IdClient: +edu.IdClient,  
      idEducationLevel: +edu.idEducationLevel,
      idEducationExamination: +edu.idEducationExamination,
      idEducationResult: +edu.idEducationResult,
      passingYear: +edu.passingYear,
      cgpa: edu.cgpa ? +edu.cgpa : null,
      examScale: edu.examscale ? +edu.examscale : null,
      marks: edu.marks ? +edu.marks : null,
      duration: edu.duration ? +edu.duration : null,
      isForeignInstitute: edu.isForeignInstitute === 'true' || edu.isForeignInstitute === true,
    }));
    formData.append('employeeEducationInfos', JSON.stringify(educations));
  }


  const documentArray = this.employeeForm.get('employeeDocument') as FormArray;

  if (documentArray && documentArray.length > 0) {
    const documents = documentArray.value.map((doc: any) => ({
      ...doc,
       id: doc.id ?? null,                    // existing record id
      IdClient: +doc.IdClient,   
      documentName: doc.documentName || '',
      filename: doc.filename || '',
      uploadDate: doc.uploadDate ? new Date(doc.uploadDate).toISOString() : null,
      uploadedFileExtention: doc.uploadedFileExtention || '',
      uploadedFileBase64: doc.uploadedFileBase64 || ''
    }));

    formData.append('employeeDocument', JSON.stringify(documents));
  }


  const certArray = this.employeeForm.get('employeeProfessionalCertification') as FormArray;
  if (certArray && certArray.length > 0) {
    const certifications = certArray.value.map((cert: any) => ({
      ...cert,
       id: cert.id ?? null,                    // existing record id
      IdClient: +cert.IdClient,
      certificationTitle: cert.certificationTitle?.trim() || '',
      certificationInstitute: cert.certificationInstitute?.trim() || '',
      instituteLocation: cert.instituteLocation?.trim() || '',
      fromDate: cert.fromDate ? new Date(cert.fromDate).toISOString() : null,
      toDate: cert.toDate ? new Date(cert.toDate).toISOString() : null,
    }));
    formData.append('employeeProfessionalCertification', JSON.stringify(certifications));
  }



  // Append employeeFamilyInfos FormArray as JSON string
  const familyArray = this.employeeForm.get('employeeFamilyInfo') as FormArray;
  if (familyArray && familyArray.length > 0) {
    const familyInfos = familyArray.value.map((fam: any) => ({
      ...fam,
       id: fam.id ?? null,                    // existing record id
      IdClient: +fam.IdClient,
      name: fam.name?.trim() || '',
      idGender: fam.idGender ? +fam.idGender : null,
      idRelationship: fam.idRelationship ? +fam.idRelationship : null,
      dateOfBirth: fam.dateOfBirth ? new Date(fam.dateOfBirth).toISOString() : null,
      contactNo: fam.contactNo?.trim() || '',
      currentAddress: fam.currentAddress?.trim() || '',
      permanentAddress: fam.permanentAddress?.trim() || '',
    }));
    formData.append('employeeFamilyInfo', JSON.stringify(familyInfos));
  }



  // Append image file (if any)
  if (this.selectedImageFile) {
    formData.append('employeeImage', this.selectedImageFile);
  }

  

  if (this.selectedEmployeeId) {
      //formData.append('id', this.selectedEmployeeId!.toString());

      this.employeeService.updateEmployee(formData).subscribe({
        next: (res) => {
          alert('Employee updated successfully!');
          this.isReadonly = true;
          this.loadEmployees();
          this.viewEmployeeDetails(this.selectedEmployeeId!);
        },
        error: (err) => {
          console.error('Error updating employee:', err);
        }
      });
      } else {
        this.employeeService.createEmployee(formData).subscribe({
          next: (res) => {
            alert('Employee created successfully!');
            this.isReadonly = true;
            this.loadEmployees();
          },
          error: (err) => {
            console.error('Error creating employee:', err);
          }
        });
      }

}









    onEmployeeImageSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const file = input.files[0];

        // Store in a class property if needed later
        this.selectedImageFile = file;

        // Patch correct field name to the form
        this.employeeForm.patchValue({ employeeImage: file }); // <-- match DTO name
        this.employeeForm.get('employeeImage')?.updateValueAndValidity();

        // Optional: set preview
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = (reader.result as string).split(',')[1];
          this.employeeForm.patchValue({
            employeeImageBase64: base64String,
            employeeImageExtension: file.name.split('.').pop()
          });
        };
        reader.readAsDataURL(file);
      }
    }

   onImageSelected(event: Event, index: number): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const documentsArray = this.employeeForm.get('employeeDocument') as FormArray;
    if (documentsArray && documentsArray.at(index)) {
      const docGroup = documentsArray.at(index);
      docGroup.patchValue({
        filename: file.name,
        uploadedFileExtention: file.name.split('.').pop()
      });
      // Optionally store base64 if needed
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        docGroup.patchValue({
          uploadedFileBase64: base64String // if you have this control
        });
      };
      reader.readAsDataURL(file);
    }
  }
}




    onDeleteEmployee(id: number) {
    if (confirm('Are you sure you want to deactivate this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: (res: any) => {
          alert(res.message);
          this.loadEmployees(); // refresh list
        },
        error: (err) => {
          console.error(err);
          alert('Error deleting employee.');
        }
      });
    }
  }



  private formatDateForInput(dateValue: string | Date): string {
  const date = new Date(dateValue);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}




}
