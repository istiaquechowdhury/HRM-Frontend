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
import { CreateEmployeeDTO } from '../../models/employeeCreateDto';

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


  
   
  
  idClient: number = 0;


  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private dropdownservice : DropdownService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.idClient = 10001001;
    

    
      this.buildForm(); // ✅ REQUIRED


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
      
    
  }

  viewEmployeeDetails(id: number) {
    this.employeeService.getEmployeeById(id).subscribe(data => {
      this.selectedEmployeeId = id;
      this.buildForm(data);
    });
  }



  buildForm(employee?: EmployeeDetailsDTO) {
    this.employeeForm = this.fb.group({
      IdClient: [this.idClient],
      employeeName: [employee?.employeeName || '',],
      employeeNameBangla: [employee?.employeeNameBangla || '',],
      fatherName: [employee?.fatherName || '',],
      motherName : [employee?.motherName || '',],
      birthDate: [employee?.birthDate || '',],
      joiningDate:[employee?.joiningDate || '',],
      contactNo: [employee?.contactNo || '',],
      nationaalIdentificationNumber: [employee?.nationalIdentificationNumber|| '',],
      address:[employee?.address|| '',],
      PresentAddress:[employee?.presentAddress || '',],
      hasOvertime : [employee?.hasOvertime || '',],
      hasAttendenceBonus :[employee?.hasAttendenceBonus || '',],
      isActive :[employee?.isActive || '',],
      idDepartment :[employee?.idDepartment || '',],
      idSection :[employee?.idSection || '',],
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
      employeeImageBase64: [employee?.employeeImageBase64 || '', [Validators.required]],
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
      IdClient : [this.idClient],
      idEducationLevel: [e.idEducationLevel],
      idEducationExamination: [e.idEducationExamination],
      idEducationResult: [e.idEducationExamination],
      cgpa: [e.cgpa || '',],
      examscale: [e.examScale || ''],
      marks: [e.marks || ''],
      major: [e.major || ''],
      passingYear: [e.passingYear],
      instituteName: [e.instituteName],
      isForeignInstitute: [e.isForeignInstitute],
      duration: [e.duration],
      achievement : [e.achievement]



    });
  }

  buildDocumentForm(d:Partial<EmployeeDocumentDTO> = {}): FormGroup {
    return this.fb.group({
      IdClient : [this.idClient],
      documentName: [d.documentName || '',],
      filename: [d.fileName || ''],
      uploadDate: [d.uploadDate || ''],
      uploadedFileExtention: [d.uploadedFileExtention || ''],
      uploadedFileBase64: [d.uploadedFileBase64 || ''],




    });
  }

  buildFamilyForm(f: Partial<EmployeeFamilyInfoDTO> = {}): FormGroup {
    return this.fb.group({
      IdClient : [this.idClient],
      name: [f.name || '',],
      idGender: [f.idGender || ''],
      idRelationship: [f.idRelationship || ''],
      dateOfBirth: [f?.dateOfBirth || ''],
      contactNo: [f?.contactNo || ''],
      currentAddress: [f?.currentAddress || ''],
      permanentAddress: [f?.permanentAddress || ''],



    });
  }

  buildCertificationForm(c: Partial<EmployeeProfessionalCertificationDTO> = {}): FormGroup {
    return this.fb.group({
      IdClient : [this.idClient],
      certificationTitle: [c.certificationTitle || '',],
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

    addEducation(): void {
    const eduForm = this.fb.group({
      IdClient: [this.idClient],                         // number
      idEducationLevel: [null],                          // number
      idEducationExamination: [null],                    // number
      idEducationResult: [null],                         // number
      cgpa: [null],                                      // decimal
      examscale: [null],                                 // decimal
      marks: [null],                                     // decimal
      major: [''],                                       // string
      passingYear: [null],                               // decimal (or number if year)
      instituteName: [''],                               // string
      isForeignInstitute: [false],                       // boolean
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
            IdClient: [this.idClient],                   // number
            documentName: [''],                           // string
            filename: [''],                               // string
            uploadDate: [null],                           // Date or string (ISO)
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
        IdClient: [this.idClient],            // number
        name: [''],                           // string
        idGender: [null],                     // number
        idRelationship: [null],               // number
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
        IdClient: [this.idClient],           // number
        certificationTitle: [''],             // string
        certificationInstitute: [''],         // string
        instituteLocation: [''],              // string
        fromDate: [null],                     // Date or ISO string
        toDate: [null]                       // Date or ISO string
      });

      this.certifications.push(certForm);
    }

    removeCertification(index: number): void {
      this.certifications.removeAt(index);
    }


      // onSubmit() {
      //   const formData = new FormData();

        
      //    //Append scalar fields (exclude FormArrays)
      //   Object.keys(this.employeeForm.controls).forEach(key => {
      //     const control = this.employeeForm.get(key);
      //     if (control && !(control instanceof FormArray)) {
      //       formData.append(key, control.value);
      //     }
      //   });

      //   //Append image file (if using IFormFile in backend)
      //   if (this.selectedImageFile) {
      //     formData.append('employeeImage', this.selectedImageFile);
      //   }

      //     //const employeeData = this.employeeForm.getRawValue();

      //   // Remove employeeImage from employeeData because it should be sent as file, not string
      //   // delete employeeData.employeeImage;

      //   // Append JSON string of the whole employee data
      //   // formData.append('employeeData', JSON.stringify(employeeData));

      //   // Append image file
      //   // if (this.selectedImageFile) {
      //   //   formData.append('employeeImage', this.selectedImageFile);
      //   // }

      //   // this.employeeService.createEmployee(formData).subscribe({
      //   //   next: res => console.log("✅ Employee created", res),
      //   //   error: err => console.error("❌ Error saving employee:", err)
      //   // });

      
        

        
      //         this.employeeService.createEmployee(formData).subscribe({
      //         next: (res) => {
      //           console.log("✅ Employee created", res);
      //         },
      //         error: (err) => {
      //           console.error("❌ Error saving employee:", err);
      //         }
      //         });
      // }

    // onSubmit() {
    //   const formData = new FormData();

    //   //Append scalar fields (exclude FormArrays)
    //   Object.keys(this.employeeForm.controls).forEach(key => {
    //     const control = this.employeeForm.get(key);
    //     if (control && !(control instanceof FormArray)) {
    //       formData.append(key, control.value);
    //     }
    //   });

    //   // Append FormArray data as JSON string
    //   const formArrays = ['employeeDocument', 'employeeEducationInfos', 'employeeProfessionalCertification', 'employeeFamilyInfo']; // replace with your actual FormArray names
    //   formArrays.forEach(arrayName => {
    //     const arrayControl = this.employeeForm.get(arrayName) as FormArray;
    //     if (arrayControl && arrayControl.length > 0) {
    //       const arrayData = arrayControl.value;
    //       formData.append(arrayName, JSON.stringify(arrayData));
    //     }
    //   });

    //   // Append image file (if any)
    //   if (this.selectedImageFile) {
    //     formData.append('employeeImage', this.selectedImageFile);
    //   }

    //   // Submit the formData to backend
    //   this.employeeService.createEmployee(formData).subscribe({
    //     next: (res) => {
    //       console.log("✅ Employee created", res);
    //     },
    //     error: (err) => {
    //       console.error("❌ Error saving employee:", err);
    //     }
    //   });

    


    // }

    onSubmit() {
  const formData = new FormData();

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

  // Submit formData
  this.employeeService.createEmployee(formData).subscribe({
    next: (res) => {
      console.log("✅ Employee created", res);
    },
    error: (err) => {
      console.error("❌ Error saving employee:", err);
    }
  });
}

// onSubmit() {
//   console.log('Form Submitted ✅'); // TESTING

//   const formData = new FormData();
//   formData.append('employeeName', this.employeeForm.get('employeeName')?.value);
//   if (this.selectedImageFile) {
//     formData.append('employeeImage', this.selectedImageFile);
//   }

//   formData.append('employeeEducationInfos', JSON.stringify(this.educationInfos.value));
//   formData.append('employeeFamilyInfo', JSON.stringify(this.familyInfos.value));
//   formData.append('employeeDocument', JSON.stringify(this.documents.value));
//   formData.append('employeeProfessionalCertification', JSON.stringify(this.certifications.value));

//   this.employeeService.createEmployee(formData).subscribe(res => {
//     console.log('Saved successfully:', res);
//   });
// }







    onImageSelected(event: Event): void {
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


}
