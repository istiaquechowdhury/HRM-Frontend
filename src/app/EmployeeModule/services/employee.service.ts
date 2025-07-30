import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDTO } from '../models/employee.dto';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:5045/api/employee?IdClient=10001001';

  constructor(private http: HttpClient) {}

 getAllEmployees(): Observable<EmployeeDTO[]> {
  return this.http.get<EmployeeDTO[]>(this.apiUrl);
}
}
