import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

export interface Item {
  id: number;
  name: string;
  age: number;
  grade: string
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://127.0.0.1:8000/students/'
  constructor(private http: HttpClient) { }
    getItems(): Observable<Item[]> {
      return this.http.get<Item[]>(this.apiUrl);
    }
  
    getItem(id: number): Observable<Item> {
      return this.http.get<Item>(`${this.apiUrl}${id}/`);
    }
  
    createItem(item: Item): Observable<Item> {
      return this.http.post<Item>(this.apiUrl, item);
    }
  
    updateItem(id: number, item: Item): Observable<Item> {
      return this.http.put<Item>(`${this.apiUrl}${id}/`, item);
    }
  
    deleteItem(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}${id}/`);
    }
  }
