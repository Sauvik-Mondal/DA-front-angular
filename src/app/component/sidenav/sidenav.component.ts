import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  
  @Output() sidenav_sidenavToggle = new EventEmitter();
  constructor(private route:Router, public common: CommonService) { }

  ngOnInit(): void {
  }
  logMeOut() {
    this.common.logOut();
    this.route.navigate(['/coachlist']);
  }
  toggleSide() {
    this.sidenav_sidenavToggle.emit();
  }

}
