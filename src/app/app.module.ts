import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './main-pages/home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ErrorInterceptor } from './misc/errorGuard/error.guard';
import { LoginComponent } from './auth/login/login.component';
import { AlertComponent } from './misc/alert/alert.component';
import { KanjiListsComponent } from './kanji/kanji-lists/kanji-lists.component';
import { KanjiCardsComponent } from './kanji/kanji-cards/kanji-cards.component';
import { DashboardComponent } from './main-pages/dashboard/dashboard.component';
import { KanjiListComponent } from './kanji/kanji-list/kanji-list.component';
import {CookieService} from 'ngx-cookie-service';
import { KanjiCardComponent } from './kanji/kanji-card/kanji-card.component';
import { KanjiBaseInfoComponent } from './kanji/kanji-base-info/kanji-base-info.component';
import { KanjiCardListInfoComponent } from './kanji/kanji-card-list-info/kanji-card-list-info.component';
import { KanjiCardAddComponent } from './kanji/kanji-card-add/kanji-card-add.component';
import { NotFoundComponent } from './misc/not-found/not-found.component';
import { ConfirmationDialogComponent } from './dialog/confirmation-dialog/confirmation-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SettingsComponent } from './misc/settings/settings.component';
import { ValidatemailComponent } from './auth/validatemail/validatemail.component';
import { SearchComponent } from './search/search/search.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { SearchFormTopComponent } from './search/search-form-top/search-form-top.component';
import { RadicalBaseInfoComponent } from './radical/radical-base-info/radical-base-info.component';
import { VocabularyBaseInfoComponent } from './vocab/vocabulary-base-info/vocabulary-base-info.component';
import { RepeatListComponent } from './repeat-list/repeat-list/repeat-list.component';
import { RepeatListCardComponent } from './repeat-list/repeat-list-card/repeat-list-card.component';
import { RepeatListCardResultComponent } from './repeat-list/repeat-list-card-result/repeat-list-card-result.component';
import { SearchItemsComponent } from './search/search-items/search-items.component';
import { ListNameDialogComponent } from './dialog/list-name-dialog/list-name-dialog.component';
import { KanjiInfoComponent } from './kanji/kanji-info/kanji-info.component';
import { VocabularyInfoComponent } from './vocab/vocabulary-info/vocabulary-info.component';
import { RadicalInfoComponent } from './radical/radical-info/radical-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
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
    ConfirmationDialogComponent,
    SettingsComponent,
    ValidatemailComponent,
    SearchComponent,
    SearchResultComponent,
    SearchFormTopComponent,
    RadicalBaseInfoComponent,
    VocabularyBaseInfoComponent,
    RepeatListComponent,
    RepeatListCardComponent,
    RepeatListCardResultComponent,
    SearchItemsComponent,
    ListNameDialogComponent,
    KanjiInfoComponent,
    VocabularyInfoComponent,
    RadicalInfoComponent
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
