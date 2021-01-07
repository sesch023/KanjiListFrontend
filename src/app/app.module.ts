import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptor } from './errorGuard/error.guard';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { KanjiListsComponent } from './kanji-lists/kanji-lists.component';
import { KanjiCardsComponent } from './kanji-cards/kanji-cards.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KanjiListComponent } from './kanji-list/kanji-list.component';
import {CookieService} from 'ngx-cookie-service';
import { KanjiCardComponent } from './kanji-card/kanji-card.component';
import { KanjiBaseInfoComponent } from './kanji-base-info/kanji-base-info.component';
import { KanjiCardListInfoComponent } from './kanji-card-list-info/kanji-card-list-info.component';
import { KanjiCardAddComponent } from './kanji-card-add/kanji-card-add.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    KanjiListsComponent,
    KanjiCardsComponent,
    DashboardComponent,
    KanjiListComponent,
    KanjiCardComponent,
    KanjiBaseInfoComponent,
    KanjiCardListInfoComponent,
    KanjiCardAddComponent,
    NotFoundComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
