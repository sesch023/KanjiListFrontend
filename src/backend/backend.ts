import {Observable} from 'rxjs';
import {Kanji} from '../supportClasses/kanji';
import config from '../config';
import {HttpClient} from '@angular/common/http';
import {KanjiList} from '../supportClasses/kanji.list';
import {KanjiCard} from '../supportClasses/kanji.card';
import {Radical} from '../supportClasses/radical';
import {Vocabulary} from '../supportClasses/vocabulary';

export class Backend {
  static getKanji(kanji: string, http: HttpClient): Observable<Kanji> {
    console.log(kanji);
    return http.get<any>(`${config.apiUrl}/api/kanjiinfo/${kanji}`, {withCredentials: true});
  }

  static getRadical(radical: string, http: HttpClient): Observable<Radical> {
    return http.get<any>(`${config.apiUrl}/api/radical/${radical}`, {withCredentials: true});
  }

  static getVocabulary(vocabularyID: string, http: HttpClient): Observable<Vocabulary> {
    return http.get<any>(`${config.apiUrl}/api/jpvocab/${vocabularyID}`, {withCredentials: true});
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

  static updateKanjiCardRepeat(cardID: string, learnedStatus: number,  http: HttpClient): Observable<void> {
    return http.put<any>(`${config.apiUrl}/api/updateKanjiCard/${cardID}?learnedStatus=${learnedStatus}&updateRepeatDate=1`, {},
      {withCredentials: true});
  }

  static addKanjiCard(listID: string, kanji: string, http: HttpClient): Observable<string> {
    return http.post<any>(`${config.apiUrl}/api/addKanjiCard/${listID}?kanji=${kanji}`, {}, {withCredentials: true});
  }

  static getKanjiList(listID: string, http: HttpClient): Observable<KanjiList>{
    return http.get<any>(`${config.apiUrl}/api/getKanjiList/${listID}`, {withCredentials: true});
  }

  static getRepetitionList(listID: string, http: HttpClient, limit: number = Infinity): Observable<Array<KanjiCard>>{
    if (isFinite(limit)){
      return http.get<any>(`${config.apiUrl}/api/getRepetitionList/${listID}?cardsLimit=${limit}`, {withCredentials: true});
    } else {
      return http.get<any>(`${config.apiUrl}/api/getRepetitionList/${listID}`, {withCredentials: true});
    }
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

  static editKanjiList(listID: string, newName: string, http: HttpClient): Observable<void>{
    return http.put<any>(`${config.apiUrl}/api/editKanjiList/${listID}?newName=${newName}`, {withCredentials: true});
  }

  static search(searchTerm: string, filterDoc: string, searchFor: Array<string>, sliceLow: number, sliceHigh: number, http: HttpClient)
    : Observable<object> {
    return http.get<any>(`${config.apiUrl}/api/search?searchTerm=${searchTerm}&filterDoc=${filterDoc}&` +
      `resultSearch=${JSON.stringify(searchFor)}&sliceLow=${sliceLow}&sliceHigh=${sliceHigh}`, {withCredentials: true});
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
