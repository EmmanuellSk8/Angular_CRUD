import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private API_URL = 'http://localhost:3000/api/users';

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.API_URL);
    }

    createUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.API_URL}/create`, user);
    }

    updateUser(id: number, user: User): Observable<User> {
        return this.http.put<User>(`${this.API_URL}/update/${id}`, user);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/delete/${id}`);
    }

}