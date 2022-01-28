import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonService } from '../../services/common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Output() toolbar_sidenavToggle = new EventEmitter();
  constructor(private route:Router, public common: CommonService) { }

  ngOnInit(): void {
  }
  logMeOut() {
    this.common.logOut();
    this.route.navigate(['/coachlist']);
  }
  toggleSide() {
    this.toolbar_sidenavToggle.emit();
  }
}
