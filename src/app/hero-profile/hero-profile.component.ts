import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.scss']
})
export class HeroProfileComponent implements OnInit {
@Input() data;
  constructor() { }

  ngOnInit(): void {
  }

}
