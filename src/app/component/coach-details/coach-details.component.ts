import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-coach-details',
  templateUrl: './coach-details.component.html',
  styleUrls: ['./coach-details.component.css']
})
export class CoachDetailsComponent implements OnInit {

  coach:any={};
  starCount: number=5;
  starColor: string='primary';
  id: string;
  constructor(private http: HttpClient, private common: CommonService, private router: Router,private acRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.acRoute.snapshot.paramMap.get('coachId');
    this.http.get(`http://localhost:3000/api/coaches/${this.id}`).subscribe(
      data=> {
        this.coach=data;
        console.log(this.coach);
      },
      err=> console.error(err)
    );
  }

  onRatingChanged(newRating:number) {
    this.coach.rating = newRating;
    this.http.patch(`http://localhost:3000/api/coaches/`,
    { 
      rating: newRating, 
      userId: this.coach.userId
    },
    {
      headers: {
        "x-auth-token": this.common.getAuthToken()
      }
    }
    ).subscribe(
      data => {
        console.log(data);
      },
      error => {
      console.log("error: ");
      console.log(error);
      throw new Error("Error in updating rating, error code: "+error.message);
    })
  }
}
