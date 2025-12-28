import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.errorMessage = 'Failed to load employees';
      }
    });
  }

  deleteEmployee(id: string | undefined): void {
    if (!id) return;
    
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          this.errorMessage = 'Failed to delete employee';
        }
      });
    }
  }

  editEmployee(id: string | undefined): void {
    if (!id) return;
    this.router.navigate(['/employees', id]);
  }

  createEmployee(): void {
    this.router.navigate(['/employees/new']);
  }
}
