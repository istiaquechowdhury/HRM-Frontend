import { EmployeeDocumentDTO } from './employeedocumentdto';
import { EmployeeEducationInfosDTO } from './EmployeeEducationInfosDTO ';
import { EmployeeFamilyInfoDTO } from './employeefamililyinfodto';
import { EmployeeProfessionalCertificationDTO } from './employeeprofessionalcerdto';


export interface EmployeeDetailsDTO {
  idClient: number;
  id?: number;
  employeeName: string;
  employeeNameBangla?: string;
  fatherName?: string;
  motherName?: string;
  birthDate?: string; // use string for ISO date
  joiningDate?: string;
  contactNo?: string;
  nationalIdentificationNumber?: string;
  address?: string;
  presentAddress?: string;
  hasOvertime?: boolean;
  hasAttendenceBonus?: boolean;
  isActive?: boolean;
  employeeImageExtension?: string | null;
  idDepartment: number;
  departmentName?: string | null;
  idSection: number;
  sectionName?: string | null;
  idDesignation?: number | null;
  designationName?: string | null;
  idEmployeeType?: number | null;
  employeeTypeName?: string | null;
  idJobType?: number | null;
  jobTypeName?: string | null;
  idGender?: number | null;
  genderName?: string | null;
  idReligion?: number | null;
  religionName?: string | null;
  idMaritalStatus?: number | null;
  maritalStatusName?: string | null;
  idWeekOff?: number | null;
  weekOffDay?: string | null;
  idReportingManager?: number | null;
  reportingManagerName?: string | null;
  createdBy?: string;
  setDate?: string;
  employeeImageBase64?: string | null;
  employeeDocuments?: EmployeeDocumentDTO[];
  employeeEducationInfos?: EmployeeEducationInfosDTO[];
  employeeProfessionalCertifications?: EmployeeProfessionalCertificationDTO[];
  employeefamilyInfos?: EmployeeFamilyInfoDTO[];
}