import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';   

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],  
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  task: string = '';
  tasks: string[] = [];
  editIndex: number = -1;

  addTask() {
    if (!this.task.trim()) return;

    if (this.editIndex === -1) {
      this.tasks.push(this.task);
    } else {
      this.tasks[this.editIndex] = this.task;
      this.editIndex = -1;
    }

    this.task = '';
  }

  editTask(i: number) {
    this.task = this.tasks[i];
    this.editIndex = i;
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }
}