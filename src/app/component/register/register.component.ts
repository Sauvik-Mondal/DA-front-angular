import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  coach:any={name:'',expertise:'',noOfCourses:''};
  constructor(private fb: FormBuilder, private http: HttpClient, private common: CommonService, private router: Router) { }

  ngOnInit(): void {

    this.http.get(`http://localhost:3000/api/coaches/user/${this.common.getUserId()}`).subscribe(
      data=> {
        if(data!=null){
          this.coach=data;
        }
        console.log(this.coach);
      },
      err=> console.error(err)
    );

    this.registerForm = this.fb.group({
      name: [this.coach.name, [Validators.required]],
      noOfCourses: [this.coach.noOfCourses, [Validators.required,Validators.min(1),Validators.pattern("^[0-9]*$")]],
      expertise: [this.coach.expertise, [Validators.required]]
    });
  }

  onSubmit() {
      this.http.post<any>(`http://localhost:3000/api/coaches/`,
      {...this.registerForm.value,'rating':0,'userId':this.common.getUserId()},
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": this.common.getAuthToken()
          }
        }
      ).subscribe(
        data => {
          console.log("success: ");
          console.log(data);
          this.makeCoach();
          this.registerForm.reset();
          setTimeout(() =>{ this.router.navigate(['/coachlist']); },1000);
        },
      error => {
        console.log("error: ");
        console.log(error);
        throw new Error("Error in submitting data, error code: "+error.message);
      }
    );
    }

    makeCoach() {
      this.http.patch<any>('http://localhost:3000/api/auth/',
        {
            "localId": this.common.getUserId(),
            "isCoach": true
        },
        {
          headers: {
            "x-auth-token": this.common.getAuthToken()
          }
        }).subscribe(
          data => {
            console.log("success: ");
            console.log(data);
            this.common.setUserAsCoach();
          },
        error => {
          console.log("error: ");
          console.log(error);
          throw new Error("Error in submitting data, error code: "+error.message);
        }
      );
    }
}
