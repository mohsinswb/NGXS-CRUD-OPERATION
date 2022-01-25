import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Todo} from './models/Todo';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    apiUrl='https://localhost:44302/api/Employees'

    constructor(private http: HttpClient) {
    }

    fetchTodos():Observable<Todo[]> {
        return this.http.get<Todo[]>(`${this.apiUrl}/GetAll`);
    }

    deleteTodo(id: number) {
        return this.http.delete(`https://localhost:44302/api/Employees/delete/${id}`);
    }

    addTodo(payload: Todo) {
        return this.http.post<Todo>(`https://localhost:44302/api/Employees/save`, payload);
    }

    updateTodo(payload: Todo, id: number) {
        return this.http.put<Todo>(`https://localhost:44302/api/Employees/update/${id}`, payload);
    }
}