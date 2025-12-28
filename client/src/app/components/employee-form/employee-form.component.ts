import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    name: '',
    position: '',
    level: 'junior'
  };
  isEditMode: boolean = false;
  errorMessage: string = '';

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.loadEmployee(id);
    }
  }

  loadEmployee(id: string): void {
    this.employeeService.getEmployee(id).subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (error) => {
        console.error('Error loading employee:', error);
        this.errorMessage = 'Failed to load employee';
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode && this.employee._id) {
      this.updateEmployee();
    } else {
      this.createEmployee();
    }
  }

  createEmployee(): void {
    this.employeeService.createEmployee(this.employee).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        console.error('Error creating employee:', error);
        this.errorMessage = 'Failed to create employee';
      }
    });
  }

  updateEmployee(): void {
    if (!this.employee._id) return;
    
    this.employeeService.updateEmployee(this.employee._id, this.employee).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        console.error('Error updating employee:', error);
        this.errorMessage = 'Failed to update employee';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
