import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hero-job-ad',
  templateUrl: './hero-job-ad.component.html',
  styleUrls: ['./hero-job-ad.component.scss']
})
export class HeroJobAdComponent implements OnInit {
@Input() data;
  constructor() { }

  ngOnInit(): void {
  }

}
