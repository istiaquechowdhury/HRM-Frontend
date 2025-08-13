import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDTO } from '../models/employee.dto';
import { EmployeeDetailsDTO } from '../models/employeeDetails';
import { CreateEmployeeDTO } from '../models/employeeCreateDto';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


        private baseUrl = 'http://localhost:5045/api/employee';
        private clientId = '10001001';

        constructor(private http: HttpClient) {}

      
        getAllEmployees(): Observable<EmployeeDTO[]> {
         return this.http.get<EmployeeDTO[]>(`${this.baseUrl}?IdClient=${this.clientId}`);
        }

          getEmployeeById(id: number): Observable<EmployeeDetailsDTO> {
          return this.http.get<EmployeeDetailsDTO>(`${this.baseUrl}/detail?IdClient=${this.clientId}&id=${id}`);
        }

        createEmployee(formData: FormData) {
          console.log(formData)
          return this.http.post(this.baseUrl, formData);
          
        }

        updateEmployee(formData: FormData): Observable<any> {
        return this.http.put(this.baseUrl, formData);  // No /employeeId here
        }

        deleteEmployee(id: number): Observable<any> {
          return this.http.delete(`${this.baseUrl}/${this.clientId}/${id}`);
        }

        

       



    

}
