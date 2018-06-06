import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) { 

    this.form = fb.group({
      email:['', Validators.compose([Validators.required, Validators.email])],
      password:['', Validators.compose([Validators.required])]
    });

  }

  ngOnInit() {
  }

  submited: boolean = false;

  loading: boolean = false;

  form: FormGroup;

  signin(){
    
    this.submited = true;

    if(this.form.valid){
      this.loading = true;

      let credentials = this.form.value;

      this.authService.authorize(credentials.email, credentials.password)
      .pipe(finalize(() => this.loading = false))
      .subscribe(resp =>{
        this.authService.storeToken(resp.token);
        this.authService.storeUser(resp.user);
        this.router.navigate(['/'])
      });
    }
  }

}
