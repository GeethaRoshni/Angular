import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.scss']
})
export class ObservableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // Defining Obsevable
    const observable = new Observable(Subscriber => {
      Subscriber.next(1);
      Subscriber.next(2);
      Subscriber.next(3);
      setTimeout(() => {
        Subscriber.next(4); // Asynchronous
        Subscriber.complete();
      }, 1000);
    })

    console.log("just before subscribe");
    observable.subscribe({
      next(x) { console.log('get', + x); },
      error(err) { console.log('err', err); },
      complete() { console.log('complete'); }
    });

    console.log('after subscribe');

    this.foo();
    this.observableFunc();

    // 1. Creating Observables

    const observableOne = new Observable(subscriber => {
      const intervalId = setInterval(() => {
        subscriber.next('hi')
      }, 1000);
    })


    // 2. Subscribing Observable
   const observableOneSubscription =  observableOne.subscribe(x => console.log('subscribe', x))

    // 3. Executing Observables
    // Once we set complete means then the next function wont call
    const compObservable = new Observable(subscribe => {
      subscribe.next(1);
      subscribe.next(2);
      subscribe.next(3);
      subscribe.complete;
      subscribe.next(4);  // Is not delivered because it would violate the contract
    })

    // If we want to catch a observerable error
    const errObservable = new Observable(subscriber => {
      try {
        subscriber.next(1);
        subscriber.next(2);
      } catch (err) {
        subscriber.error(err); // delivers an error if it caught one
      }
    });

    // 4. Disposing Observable Executions

    const subscription = observableOne.subscribe(x => console.log('subscribe', x));

    subscription.unsubscribe(); // Destroy a observable
    observableOneSubscription.unsubscribe();
    
  }

  // Difference b/w observable and function

  foo() {
    console.log('Hello');
    return 42;
    return 100; // This is dead code of function. It can return only one value and function is synchronous
  }

  observableFunc() {
    const foo = new Observable(subscriber => {
      console.log("hello");
      subscriber.next(42);
      subscriber.next(100); // Observable can return multiple values and observable is asynchronous
    });

    foo.subscribe(val => {
      console.log(val);
    })
  }

}
