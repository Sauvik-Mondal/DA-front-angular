import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private route:Router, public common: CommonService) { }

  ngOnInit(): void {
  }
  logMeOut() {
    this.common.logOut();
    this.route.navigate(['/coachlist']);
  }
}
