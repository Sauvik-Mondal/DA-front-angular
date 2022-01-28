import { Component } from '@angular/core';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alapA';
  showFiller = false;
  constructor(private common: CommonService) { }
  ngOnInit(): void {
    this.common.autoLogin();
  }
  tog() {
    this.showFiller=!this.showFiller;
  }
}
