import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Ensures it's available globally
})
export class AttackTableService {
  private apiUrl = 'http://localhost:8081/api/tests'; // Adjust if needed

  constructor(private http: HttpClient) {}

  getRecords(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addRecord(record: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, record);
  }

  deleteRecord(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getTests(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTest(test: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, test);
  }

  deleteTest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
