import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth/authGuard/auth.guard';
import {HomeComponent} from './main-pages/home/home.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {KanjiListsComponent} from './kanji/kanji-lists/kanji-lists.component';
import {KanjiCardsComponent} from './kanji/kanji-cards/kanji-cards.component';
import {DashboardComponent} from './main-pages/dashboard/dashboard.component';
import {KanjiListComponent} from './kanji/kanji-list/kanji-list.component';
import {NotAuthGuard} from './auth/notAuthGuard/notAuth.guard';
import {KanjiCardComponent} from './kanji/kanji-card/kanji-card.component';
import {KanjiCardAddComponent} from './kanji/kanji-card-add/kanji-card-add.component';
import {NotFoundComponent} from './misc/not-found/not-found.component';
import {SettingsComponent} from './misc/settings/settings.component';
import {ValidatemailComponent} from './auth/validatemail/validatemail.component';
import {SearchComponent} from './search/search/search.component';
import {RepeatListComponent} from './repeat-list/repeat-list/repeat-list.component';
import {KanjiInfoComponent} from './kanji/kanji-info/kanji-info.component';
import {RadicalInfoComponent} from './radical/radical-info/radical-info.component';
import {VocabularyInfoComponent} from './vocab/vocabulary-info/vocabulary-info.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'validatemail', component: ValidatemailComponent, canActivate: [NotAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NotAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'kanjilists', component: KanjiListsComponent, canActivate: [AuthGuard]},
  { path: 'kanjilists/:id', component: KanjiListComponent, canActivate: [AuthGuard]},
  { path: 'kanjicards/:id', component: KanjiCardComponent, canActivate: [AuthGuard]},
  { path: 'kanjicards', component: KanjiCardsComponent, canActivate: [AuthGuard] },
  { path: 'addkanjicard/:id', component: KanjiCardAddComponent, canActivate: [AuthGuard] },
  { path: 'repeatlist/:id', component: RepeatListComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'search/:term', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'kanji/:id', component: KanjiInfoComponent, canActivate: [AuthGuard]},
  { path: 'radical/:id', component: RadicalInfoComponent, canActivate: [AuthGuard]},
  { path: 'vocabulary/:id', component: VocabularyInfoComponent, canActivate: [AuthGuard]},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
