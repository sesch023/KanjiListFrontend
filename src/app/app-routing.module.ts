import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './authGuard/auth.guard';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {KanjiListsComponent} from './kanji-lists/kanji-lists.component';
import {KanjiCardsComponent} from './kanji-cards/kanji-cards.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {KanjiListComponent} from './kanji-list/kanji-list.component';
import {NotAuthGuard} from './notAuthGuard/notAuth.guard';
import {KanjiCardComponent} from './kanji-card/kanji-card.component';
import {KanjiCardAddComponent} from './kanji-card-add/kanji-card-add.component';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'kanjilists', component: KanjiListsComponent, canActivate: [AuthGuard]},
  { path: 'kanjilists/:id', component: KanjiListComponent, canActivate: [AuthGuard]},
  { path: 'kanjicards/:id', component: KanjiCardComponent, canActivate: [AuthGuard]},
  { path: 'kanjicards', component: KanjiCardsComponent, canActivate: [AuthGuard] },
  { path: 'addkanjicard/:id', component: KanjiCardAddComponent, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
