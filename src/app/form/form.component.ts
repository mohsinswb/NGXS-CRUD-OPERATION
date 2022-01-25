import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Select, Store } from "@ngxs/store";
import { ActivatedRoute, Router } from "@angular/router";
import { TodoState } from "../states/todo.state";
import { AddTodo, SetSelectedTodo, UpdateTodo } from "../actions/todo.action";
import { Observable, Subscription } from "rxjs";
import { Todo } from "../models/Todo";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"],
})
export class FormComponent implements OnInit, OnDestroy {
  @Select(TodoState.getSelectedTodo) selectedTodo: Observable<Todo>;
  todoForm: FormGroup;
  editMode = false;
  private formSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
  this.patchData();
  }
   
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
  patchData(){
    this.formSubscription.add(
      this.selectedTodo.subscribe((todo) => {
        if (todo) {
          this.todoForm.patchValue({
            id: todo.id,
            name: todo.name,
            address: todo.address,
            city: todo.city,
          });
          this.editMode = true;
        } else {
          this.editMode = false;
        }
      })
    );
  }
  createForm() {
    this.todoForm = this.fb.group({
      id: [0],
      name: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(
        new UpdateTodo(this.todoForm.value, this.todoForm.value.id));
      this.clearForm();
      // this.createForm();
    } 
    else {
      this.store.dispatch(new AddTodo(this.todoForm.value));
      this.clearForm();
      // this.createForm();
    }
  }

  clearForm() {
    this.todoForm.reset();
    this.createForm();
    this.store.dispatch(new SetSelectedTodo(null));
  }
}
