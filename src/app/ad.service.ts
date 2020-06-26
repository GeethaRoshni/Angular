import { Injectable } from '@angular/core';
import { AdItems } from './add-items';
import { HeroJobAdComponent } from './hero-job-ad/hero-job-ad.component';
import { HeroProfileComponent } from './hero-profile/hero-profile.component';

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor() { }

  getAds() {
    return [
      new AdItems(HeroProfileComponent, { name: 'Bombasto', bio: 'Brave as they come' }),

      new AdItems(HeroProfileComponent, { name: 'Dr IQ', bio: 'Smart as they come' }),

      new AdItems(HeroJobAdComponent, {
        headline: 'Hiring for several positions',
        body: 'Submit your resume today!'
      }),

      new AdItems(HeroJobAdComponent, {
        headline: 'Openings in all departments',
        body: 'Apply today'
      }),
    ];
  }
}
