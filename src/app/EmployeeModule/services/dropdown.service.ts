import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseDropdownDto } from '../models/dropdowndto';



@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  private baseUrl = 'http://localhost:5045/api/dropdowns/departmentsdropdown?IdClient=10001001'; // Replace with your actual base API URL

  constructor(private http: HttpClient) {}

 getDepartments(clientId: number): Observable<BaseDropdownDto[]> {
  return this.http.get<BaseDropdownDto[]>(`http://localhost:5045/api/dropdowns/departmentsdropdown?IdClient=${clientId}`);
}

  getSections(clientId: number): Observable<BaseDropdownDto[]> {
  return this.http.get<BaseDropdownDto[]>(`http://localhost:5045/api/dropdowns/sectionsdropdown?IdClient=${clientId}`);
}

  getDesignations(clientId: number): Observable<BaseDropdownDto[]> {
  return this.http.get<BaseDropdownDto[]>(`http://localhost:5045/api/dropdowns/designationsdropdown?IdClient=${clientId}`);
}

 getReportingManagers(clientId: number): Observable<BaseDropdownDto[]> {
  return this.http.get<BaseDropdownDto[]>(`http://localhost:5045/api/dropdowns/reportingmanagersdropdown?IdClient=${clientId}`);
}



getJobTypes(clientId: number): Observable<BaseDropdownDto[]> {
  return this.http.get<BaseDropdownDto[]>(`http://localhost:5045/api/dropdowns/jobtypesdropdown?IdClient=${clientId}`);
}

getEmployeeTypes(clientId: number): Observable<BaseDropdownDto[]> {
  return this.http.get<BaseDropdownDto[]>(`http://localhost:5045/api/dropdowns/employeetypesdropdown?IdClient=${clientId}`);
}

getGenders(clientId: number): Observable<BaseDropdownDto[]> {
  return this.http.get<BaseDropdownDto[]>(`http://localhost:5045/api/dropdowns/gendersdropdown?IdClient=${clientId}`);
}

getReligions(clientId: number): Observable<BaseDropdownDto[]> {
  return this.http.get<BaseDropdownDto[]>(`http://localhost:5045/api/dropdowns/religionsdropdown?IdClient=${clientId}`);
}

getWeekOffs(clientId: number): Observable<BaseDropdownDto[]> {
  return this.http.get<BaseDropdownDto[]>(`http://localhost:5045/api/dropdowns/weekoffsdropdown?IdClient=${clientId}`);
}

getMaritalStatuses(clientId: number): Observable<BaseDropdownDto[]> {
  return this.http.get<BaseDropdownDto[]>(`http://localhost:5045/api/dropdowns/maritalstatusesdropdown?IdClient=${clientId}`);
}


getRelationships(clientId: number): Observable<BaseDropdownDto[]> {
  return this.http.get<BaseDropdownDto[]>(`http://localhost:5045/api/dropdowns/relationshipsdropdown?IdClient=${clientId}`);
}



getEducationLevels(clientId: number): Observable<BaseDropdownDto[]> {
  return this.http.get<BaseDropdownDto[]>(`http://localhost:5045/api/dropdowns/educationleveldropdown?IdClient=${clientId}`);
}


getEducationExaminations(clientId: number): Observable<BaseDropdownDto[]> {
  return this.http.get<BaseDropdownDto[]>(`http://localhost:5045/api/dropdowns/educationexaminationdropdown?IdClient=${clientId}`);
}


getEducationResult(clientId: number): Observable<BaseDropdownDto[]> {
  return this.http.get<BaseDropdownDto[]>(`http://localhost:5045/api/dropdowns/educationresultdropdown?IdClient=${clientId}`);
}

  // You can add more dropdown methods like getDesignations(), getRoles(), etc.
}
