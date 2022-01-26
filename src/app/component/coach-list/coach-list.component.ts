import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.css']
})
export class CoachListComponent implements OnInit {

  coaches: any;
  maxRating: number = 5;
  constructor(private http: HttpClient, public common: CommonService) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/coaches/').subscribe(
      data => {
        this.coaches = data;
        console.log(data);
      },
      err => console.error(err)
    );
  }

  counter(n: number): Array<number> {
    return Array(n);
  }

  resignMe(coach: any) {
    this.http.delete(`http://localhost:3000/api/coaches/${this.common.getUserId()}`,
      {
        headers: {
          'x-auth-token': this.common.getAuthToken()
        }
      }
    ).subscribe(
      data => {
        this.resignMeOnServer();
        this.common.removeUserAsCoach();
        window.location.reload();
        console.log("Success"+data);
      },
      error => {
        console.log("error: ");
        console.log(error);
        throw new Error("Error in deleting coach, error code: " + error.message);
      });
  }

  resignMeOnServer() {
      this.http.patch<any>('http://localhost:3000/api/auth/',
        {
            "localId": this.common.getUserId(),
            "isCoach": false
        },
        {
          headers: {
            "x-auth-token": this.common.getAuthToken()
          }
        }).subscribe(
          data => {
            console.log("success: ");
            console.log(data);
          },
        error => {
          console.log("error: ");
          console.log(error);
          throw new Error("Error in submitting data, error code: "+error.message);
        }
      );
  }
}
