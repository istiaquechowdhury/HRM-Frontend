import { EmployeeDocumentDTO } from './employeedocumentdto';
import { EmployeeEducationInfosDTO } from './EmployeeEducationInfosDTO ';
import { EmployeeFamilyInfoDTO } from './employeefamililyinfodto';
import { EmployeeProfessionalCertificationDTO } from './employeeprofessionalcerdto';

export interface CreateEmployeeDTO {
  employeeName: string;
  employeeNameBangla?: string;
  fatherName?: string;
  motherName?: string;
  birthDate?: string; // format: 'YYYY-MM-DD'
  joiningDate?: string;
  contactNo?: string;
  nationalIdentificationNumber?: string;
  address?: string;
  presentAddress?: string;
  hasOvertime?: boolean;
  hasAttendenceBonus?: boolean;
  isActive?: boolean;
  employeeImageExtension?: string | null;
  idDepartment?: number | null;
  idSection?: number | null;
  idDesignation?: number | null;
  idEmployeeType?: number | null;
  idJobType?: number | null;
  idGender?: number | null;
  idReligion?: number | null;
  idMaritalStatus?: number | null;
  idWeekOff?: number | null;
  idReportingManager?: number | null;
  createdBy?: string;
  setDate?: string;
  employeeImageBase64?: string | null;

  // child collections
  employeeDocuments?: EmployeeDocumentDTO[];
  employeeEducationInfos?: EmployeeEducationInfosDTO[];
  employeeProfessionalCertifications?: EmployeeProfessionalCertificationDTO[];
  employeefamilyInfos?: EmployeeFamilyInfoDTO[];
}
