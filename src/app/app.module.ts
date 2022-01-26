import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule , ReactiveFormsModule  } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './component/login/login.component';
import { ErrorComponent } from './component/error/error.component';
import { FeedBackComponent } from './component/feed-back/feed-back.component';
import { FeedBackListComponent } from './component/feed-back-list/feed-back-list.component';
import { RegisterComponent } from './component/register/register.component';
import { CoachListComponent } from './component/coach-list/coach-list.component';
import { CoachDetailsComponent } from './component/coach-details/coach-details.component';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { HeaderComponent } from './component/header/header.component';
import { CommonService } from './services/common.service';
import { StarRatingComponent } from './component/coach-details/star-rating/star-rating.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    FeedBackComponent,
    FeedBackListComponent,
    RegisterComponent,
    CoachListComponent,
    CoachDetailsComponent,
    ToolbarComponent,
    SidenavComponent,
    HeaderComponent,
    StarRatingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule ,
    HttpClientModule,
    MatSnackBarModule,
    MatSelectModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
