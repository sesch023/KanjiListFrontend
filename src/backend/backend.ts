import {Observable} from 'rxjs';
import {Kanji} from '../supportInterfaces/kanji';
import config from '../config';
import {HttpClient} from '@angular/common/http';
import {KanjiList} from '../supportInterfaces/kanji.list';
import {KanjiCard} from '../supportInterfaces/kanji.card';

export class Backend {
  static getKanji(kanji: string, http: HttpClient): Observable<Kanji> {
    return http.get<any>(`${config.apiUrl}/api/kanjiinfo/${kanji}`, {withCredentials: true});
  }

  static getKanjiCard(cardID: string, http: HttpClient): Observable<KanjiCard> {
    return http.get<any>(`${config.apiUrl}/api/getKanjiCard/${cardID}`, {withCredentials: true});
  }

  static removeKanjiCard(cardID: string, http: HttpClient): Observable<void> {
    return http.delete<any>(`${config.apiUrl}/api/removeKanjiCard/${cardID}`, {withCredentials: true});
  }

  static updateKanjiCard(cardID: string, learnedStatus: number, note: string, http: HttpClient): Observable<void> {
    return http.put<any>(`${config.apiUrl}/api/updateKanjiCard/${cardID}?learnedStatus=${learnedStatus}`, {note}, {withCredentials: true});
  }

  static addKanjiCard(listID: string, kanji: string, http: HttpClient): Observable<string> {
    return http.post<any>(`${config.apiUrl}/api/addKanjiCard/${listID}?kanji=${kanji}`, {}, {withCredentials: true});
  }

  static getKanjiList(listID: string, http: HttpClient): Observable<KanjiList>{
    return http.get<any>(`${config.apiUrl}/api/getKanjiList/${listID}`, {withCredentials: true});
  }

  static addKanjiList(listName: string, http: HttpClient): Observable<string> {
    return http.post<any>(`${config.apiUrl}/api/addKanjiList/${listName}`, {}, {withCredentials: true});
  }

  static removeKanjiList(listID: string, http: HttpClient): Observable<void> {
    return http.delete<any>(`${config.apiUrl}/api/removeKanjiList/${listID}`, {withCredentials: true});
  }

  static getKanjiLists(http: HttpClient): Observable<Array<KanjiList>>{
    return http.get<any>(`${config.apiUrl}/api/getKanjiLists`, {withCredentials: true});
  }

  static signup(email: string, password: string, http: HttpClient): Observable<void> {
    return http.post<any>(`${config.apiUrl}/api/signup`, {email, password}, {withCredentials: true});
  }

  static removeAccount(http: HttpClient): Observable<void> {
    return http.delete<any>(`${config.apiUrl}/api/removeUser`, {withCredentials: true});
  }

  static validateMail(email: string, emailVerificationHash: string, http: HttpClient): Observable<void> {
    return http.get<any>(`${config.apiUrl}/api/validateMail?email=${email}&emailVerificationHash=${emailVerificationHash}`,
      {withCredentials: true});
  }
}
