import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Todo} from './models/Todo';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    // apiUrl='https://localhost:44302/api/Employees'
    apiUrl='https://614d84dde3cf1f001712d18a.mockapi.io/Empolyee'

    constructor(private http: HttpClient) {
    }

    fetchTodos():Observable<Todo[]> {
        return this.http.get<Todo[]>(`${this.apiUrl}`);
    }

    deleteTodo(id: number) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }

    addTodo(payload: Todo) {
        return this.http.post<Todo>(`${this.apiUrl}`, payload);
    }

    updateTodo(payload: Todo, id: number) {
        return this.http.put<Todo>(`${this.apiUrl}/${id}`, payload);
    }
}