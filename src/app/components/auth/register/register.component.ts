import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  roles: any[] = [];

  hasLowercase = false;
  hasUppercase = false;
  hasNumber = false;
  hasSpecialChar = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRoles();
    this.initForm();
  }

  getRoles(): void {
    this.authService.getRoles().subscribe({
      next: (response) => {
        this.roles = response;
      },
      error: (error) => {
        console.error('Erro ao buscar os perfis:', error);
        this.toastr.error('Erro ao carregar perfis.', 'Erro');
      }
    });
  }

  initForm(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  checkPasswordStrength(): void {
    const password = this.f['password'].value;

    this.hasLowercase = /[a-z]/.test(password);
    this.hasUppercase = /[A-Z]/.test(password);
    this.hasNumber = /[0-9]/.test(password);
    this.hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) return;

    const formValues = this.registerForm.value;

    const user: UserModel = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      role: this.roles.find(r => r.id === formValues.role)?.name ?? '',
      roleId: formValues.role
    };

    this.authService.register(user).subscribe({
      next: () => {
        this.toastr.success('Registro realizado com sucesso!', 'Sucesso');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastr.error('Falha no registro.', 'Erro');
        console.error('Erro ao registrar:', error);
      }
    });
  }
}

