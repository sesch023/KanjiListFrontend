import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './authGuard/auth.guard';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {KanjiListsComponent} from './kanji-lists/kanji-lists.component';
import {KanjiCardsComponent} from './kanji-cards/kanji-cards.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {KanjiListComponent} from './kanji-list/kanji-list.component';
import {NotAuthGuard} from './notAuthGuard/notAuth.guard';
import {KanjiCardComponent} from './kanji-card/kanji-card.component';
import {KanjiCardAddComponent} from './kanji-card-add/kanji-card-add.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {SettingsComponent} from './settings/settings.component';
import {ValidatemailComponent} from './validatemail/validatemail.component';
import {SearchComponent} from './search/search.component';
import {ReapeatListComponent} from './reapeat-list/reapeat-list.component';

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
  { path: 'repeatlist/:id', component: ReapeatListComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'search/:term', component: SearchComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
