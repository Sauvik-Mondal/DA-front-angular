import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css']
})
export class FeedBackComponent implements OnInit {

  id: string;
  coach: any = {};
  feedbackForm: FormGroup;
  typeOfFeedback = ["Praise", "Query", "Suggession"];
  constructor(private fb: FormBuilder, private http: HttpClient, private common: CommonService, private router: Router, private acRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.acRoute.snapshot.paramMap.get('coachId');
    this.http.get(`http://localhost:3000/api/coaches/${this.id}`).subscribe(
      data => {
        this.coach = data;
        console.log(this.coach);
      },
      err => console.error(err)
    );

    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      feedbackType: ['Praise', [Validators.required]],
      feedback: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.http.post<any>(`http://localhost:3000/api/connections/`, { coachId: this.common.getUserId(), ...this.feedbackForm.value})
      .subscribe(
        data => {
          console.log(data);
          this.feedbackForm.reset();
          setTimeout(() =>{ this.router.navigate(['/coachlist']); },3000);
        },
        error => {
          console.log("error: ");
          console.log(error);
          throw new Error("Error in submitting data, error code: " + error.message);
        });
        
  }
}
