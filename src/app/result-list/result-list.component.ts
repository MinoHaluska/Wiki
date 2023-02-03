import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.css']
})

export class ResultListComponent {

  @Input() pages = []
  @Input() language = ''
  @Input() title = ''
  @Input() wordCount = ''
  @Input() snippet = ''
  @Input() emptyResult = ''

}
