import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  navOpen: boolean;
  minHeight: string;
  private _initWinHeight = 0;

  constructor() { }

  ngOnInit() {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(200)
      )
      .subscribe((event) => this._resizeFn(event));
    this._initWinHeight = window.innerHeight;

    this._resizeFn(null);
  }

  navToggledHandler(event) {
    this.navOpen = event;
  }
  private _resizeFn(event: any): void {
    const winHeight: number = event ? event.target.innerHeight : this._initWinHeight;
    this.minHeight = `${winHeight}px`;
  }
}
