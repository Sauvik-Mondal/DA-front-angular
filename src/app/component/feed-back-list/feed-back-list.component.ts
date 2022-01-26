import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-feed-back-list',
  templateUrl: './feed-back-list.component.html',
  styleUrls: ['./feed-back-list.component.css']
})
export class FeedBackListComponent implements OnInit {

  connections: any;
  constructor(private http:HttpClient,private common: CommonService) { }

  ngOnInit(): void {
    console.log(this.common.getUserId())
    console.log(this.common.getAuthToken())
    const headers = {'x-auth-token': this.common.getAuthToken()};
    this.http.get(`http://localhost:3000/api/connections/`+this.common.getUserId(),{headers})
    .subscribe(
      data=> {
        this.connections=data;
        console.log(data);
      },
      err=> console.error(err)
    );
  }

  deletePost(postId:any) {
    this.http.delete(`http://localhost:3000/api/connections/${postId}`,
    {
      headers:{
        'x-auth-token': this.common.getAuthToken()
      }
    }
  ).subscribe(
    data => {
      this.connections.forEach((element,index) => {
        if(element._id === postId)
          this.connections.splice(index, 1);
      });
    },
    error => {
    console.log("error: ");
    console.log(error);
    throw new Error("Error in deleting connection, error code: "+error.message);
  })
  }

}
