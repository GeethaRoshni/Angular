import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactory, ComponentFactoryResolver } from '@angular/core';
import { AdItems } from '../add-items';
import { AdDirective } from '../ad.directive';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {
  @Input() ads: AdItems[];
  @ViewChild(AdDirective, { static: true }) adHost: AdDirective;
  currentIndex = -1;
  interval: any;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.loadComponent();
    this.getAds();
  }

  loadComponent() {
    this.currentIndex = (this.currentIndex + 1) % this.ads.length;
    const addItem = this.ads[this.currentIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(addItem.component);

    const viewContainer = this.adHost.viewContainerRef;
    viewContainer.clear();

    const componentRef = viewContainer.createComponent(componentFactory);
    componentRef.instance.data = addItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }

}
