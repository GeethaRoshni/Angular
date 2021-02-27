import { Component, OnInit } from '@angular/core';
import { observable } from 'rxjs';

@Component({
  selector: 'app-observer',
  templateUrl: './observer.component.html',
  styleUrls: ['./observer.component.scss']
})
export class ObserverComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const observer = {
      next: x => { console.log(x); },
      error: err => { console.log(err); },
      complete: comp => { console.log(comp); }
    };

  }

}
