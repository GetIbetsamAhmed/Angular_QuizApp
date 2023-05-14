import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  showResult = false;
  showPassword = false;

  @Input() thirPartyLogin = true

  constructor(private formBuilder: FormBuilder,private toastr: ToastrService, private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  onShowPasswordClick() {
    this.showPassword = !this.showPassword
  }

  onReset() {
    this.formGroup.reset();
  }

  login() {
    this.authService.login(this.formGroup.value.username, this.formGroup.value.password).subscribe({
      next: () => {
        if (this.authService.getRole() === 'admin') {
          this.toastr.success('success', 'Login Successful');
          this.router.navigate(['/admin']);
        } else if (this.authService.getRole() === 'teacher') {
          this.router.navigate(['/teacher']);
        } else {
          this.toastr.success('success', 'Login Successful');
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.log('Login failed:', error);
        this.toastr.error('Invalid Login Credentials', 'Enter Correct User Name and Password');
      }
    });
  }
}
