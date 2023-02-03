import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  constructor(private http: HttpClient) { }

  search(term: string, num: number, language: string) {
    return this.http.get(`https://${language}.wikipedia.org/w/api.php`, {
      params:{
        action: 'query',
        format: 'json',
        list: 'search',
        origin: '*',
        srlimit: num,
        srsearch: term,
        utf8: '1',
      }
    })
  }

}
