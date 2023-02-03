import { Component } from '@angular/core';
import { WikipediaService } from './wikipedia.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  pages = ''
  num: number = 5
  searchText: string = ''
  language: string = ''
  searchLanguage: string = 'sk'
  emptySearchInput: boolean = false
  hideImg: boolean = false

  languageTerm = [
    // SK 
    {
      result: 'Počet výsledkov',
      placeHolder: 'Zadaj text',
      search: 'Vyhľadať',
      title: 'Titulka',
      wordCount: 'Počet slov',
      snipped: 'Náhľad',
      emptyResult: 'Hľadaný výraz sa nenašiel.',
      emptyInput: 'Zadajte text.'
    },
    // EN
    {
      result: 'Number of results',
      placeHolder: 'Search text',
      search: 'Search',
      title: 'Title',
      wordCount: 'Word count',
      snipped: 'Snippet',
      emptyResult: 'The search term was not found.',
      emptyInput: 'Enter the text.'
    },
    // CZ
    {
      result: 'Počet výsledků',
      placeHolder: 'Zadej text',
      search: 'Vyhledat',
      title: 'Titulka',
      wordCount: 'Počet slov',
      snipped: 'Náhled',
      emptyResult: 'Hledaný výraz nebyl nalezen.',
      emptyInput: 'Zadejte text.'
    }
  ]

  selectLanguage = {
    result: 'Počet výsledkov',
    placeHolder: 'Zadaj text',
    search: 'Vyhľadať',
    title: 'Titulka',
    wordCount: 'Počet slov',
    snipped: 'Náhľad',
    emptyResult: 'Hľadaný výraz sa nenašiel.',
    emptyInput: 'Zadajte text.'
  }

  constructor(private wikiService: WikipediaService){}


  onFormSubmit(event: Event){
    this.searchText = event.target[2].value
    this.num = event.target[1].value
    this.language = event.target[0].value
    this.hideImg = true
    
    if(this.searchText){
      this.emptySearchInput = false
      
      this.wikiService.search(this.searchText, this.num, this.language).subscribe((response: any) => {
        this.pages = response.query.search
        console.log(this.language)
        console.log(event.target[0].value)
        console.log(this.pages)
      })

    } else {
      this.pages = ''
      this.emptySearchInput = true
    }
    
  }


  languageChange(language: string){
    this.searchLanguage = language
    this.language = language

    if(this.searchLanguage === 'sk'){
      this.selectLanguage = this.languageTerm[0]
    }else if(this.searchLanguage === 'en'){
      this.selectLanguage = this.languageTerm[1]
    }else if(this.searchLanguage === 'cs'){
      this.selectLanguage = this.languageTerm[2]
    }

    // Change Language
    if(this.searchText){
      this.wikiService.search(this.searchText, this.num, this.language).subscribe((response: any) => {
        this.pages = response.query.search
      })
      console.log(this.language)
    }
  }

  numberOfResultChange(numOfResults: string){
    this.num = parseInt(numOfResults)

    // Change number of Results
    if(this.searchText){
      this.wikiService.search(this.searchText, this.num, this.language).subscribe((response: any) => {
        this.pages = response.query.search
      })
    }
  }


 
}
