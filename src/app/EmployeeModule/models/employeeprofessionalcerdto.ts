export interface EmployeeProfessionalCertificationDTO {
  idClient: number;
  id: number;
  certificationTitle: string;
  certificationInstitute: string;
  instituteLocation: string;
  fromDate: Date;
  toDate?: Date; // optional
}