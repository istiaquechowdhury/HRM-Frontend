export interface EmployeeFamilyInfoDTO {
  idClient: number;
  id: number;
  name: string;
  idGender: number;
  idRelationship: number;
  dateOfBirth?: string;       // Use string for ISO date format
  contactNo?: string;
  currentAddress?: string | null;
  permanentAddress?: string | null;
}