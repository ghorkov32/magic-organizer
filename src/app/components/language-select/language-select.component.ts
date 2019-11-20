import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LanguageSelectComponent implements OnInit {
  locale = window.location.href.match('\/([a-z][a-z])\/') ? window.location.href.match('\/([a-z][a-z])\/')[1] : 'en';
  @Output()
  onLocaleSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  emitSelection() {
    if (this.locale.length === 2)
      this.onLocaleSelected.emit(this.locale);
  }
}
