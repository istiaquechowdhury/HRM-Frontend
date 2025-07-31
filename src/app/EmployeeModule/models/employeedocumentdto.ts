export interface EmployeeDocumentDTO {
  idClient: number;
  id: number;
  documentName: string;
  fileName: string;
  uploadDate: string; // Use string for ISO date
  uploadedFileExtention?: string;
  uploadedFileBase64?: string | null;
}
