import { EmployeeDocumentDTO } from "./employeedocumentdto";
import { EmployeeEducationInfosDTO } from "./EmployeeEducationInfosDTO ";
import { EmployeeProfessionalCertificationDTO } from "./employeeprofessionalcerdto";
import { EmployeeFamilyInfoDTO } from "./employeefamililyinfodto";


export interface CreateEmployeeDTO {
  idClient: number;
  employeeName?: string;
  employeeNameBangla?: string;
  employeeImage?: File; // IFormFile in .NET becomes File in Angular
  fatherName?: string;
  motherName?: string;
  idReportingManager?: number;
  idJobType?: number;
  idEmployeeType?: number;
  birthDate?: Date;
  joiningDate?: Date;
  idGender?: number;
  idReligion?: number;
  idDepartment: number;
  idSection: number;
  idDesignation?: number;
  hasOvertime?: boolean;
  hasAttendenceBonus?: boolean;
  idWeekOff?: number;
  address?: string;
  presentAddress?: string;
  nationalIdentificationNumber?: string;
  contactNo?: string;
  idMaritalStatus?: number;
  isActive?: boolean;
  createdBy?: string;

  documents: EmployeeDocumentDTO[];
  educationInfos: EmployeeEducationInfosDTO[];
  professionalCertification: EmployeeProfessionalCertificationDTO[];
  employeeFamilyInfos: EmployeeFamilyInfoDTO[];
}
