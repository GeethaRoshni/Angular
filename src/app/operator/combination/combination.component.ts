import { Component, OnDestroy, OnInit } from '@angular/core';
import { bindCallback, defer, fromEvent, of, Subscription, interval, empty, from, generate, range, throwError, timer, iif } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, mergeMap, startWith, take } from 'rxjs/operators';

@Component({
  selector: 'app-combination',
  templateUrl: './combination.component.html',
  styleUrls: ['./combination.component.scss']
})
export class CombinationComponent implements OnInit, OnDestroy {
  ajaxSubcription: Subscription;
  ajaxRes;
  bindCallBackSubscription: Subscription;
  bindCallBackRes;
  deferSubscription: Subscription;
  deferRes;
  emptySubscription: Subscription;
  emptyRes;
  fromSubscription: Subscription;
  fromArrRes;
  fromPromiseRes;
  fromCollectionRes;
  fromStrRes;
  fromEventSubscription: Subscription;
  fromEventRes;
  generateSubscription: Subscription;
  generateEventRes;
  ofSubscription: Subscription;
  ofRes;
  rangeSubscription: Subscription;
  rangeRes;
  throwErrSubscription: Subscription;
  throwErrRes;
  timerSubscription: Subscription;
  timerRes;
  iifSubscription: Subscription;
  iifRes;
  constructor() { }

  ngOnInit(): void {
    // Ajax operator
    const obs$ = ajax('https://api.github.com/users?per_page=5').pipe(
      map((res: any) => {
        return res;
      }),
      catchError(err => {
        console.log('ajaxerr', err);
        return of(err)
      })
    );

    this.ajaxSubcription = obs$.subscribe(data => this.ajaxRes = data);

    // bindCallback Operator
    const someFunc = (a, b, c) => {
      this.bindCallBackRes = a + b + c;
    }
    const obs1$ = bindCallback(someFunc);
    this.bindCallBackSubscription = obs1$(1, 3).subscribe(data => {
      return data;
    })

    // Defer Operator
    const clicksOrInterval = defer(() => {
      return Math.random() > 0.5 ? fromEvent(document, 'click') : interval(1000);
    });
    this.deferSubscription = clicksOrInterval.subscribe(val => this.deferRes = val);

    // Empty Operator
    const interval$ = interval(1000);
    const emptyObs$ = interval$.pipe(
      mergeMap(x => x % 2 === 1 ? of('Execute') : empty())
    );
    this.emptySubscription = emptyObs$.subscribe(data => this.emptyRes = data);

    const result = empty().pipe(startWith(7));
    result.subscribe(x => this.emptyRes = this.emptyRes + ',' + x);

    // From Operator
    const arraySource = from([10, 20, 30]);
    this.fromSubscription = arraySource.subscribe(data => this.fromArrRes = data);
    const promiseSource = from(new Promise(resolve => resolve('Hello')));
    this.fromSubscription = promiseSource.subscribe(data => this.fromPromiseRes = data);
    const map1 = new Map();
    map1.set(1, 'Hi');
    map1.set(2, 'Bye');
    const mapSource = from(map1);
    this.fromSubscription = mapSource.subscribe(data => this.fromCollectionRes = data);
    const source = from('Hello World');
    this.fromSubscription = source.subscribe(data => this.fromStrRes = data);

    // fromEvent Operator
    const docClick = fromEvent(document, 'click');
    const docClickObs$ = docClick.pipe(map(event => 'Event Time:' + event.timeStamp));
    this.fromEventSubscription = docClickObs$.subscribe(data => this.fromEventRes = data);

    // Generate Operator
    this.generateSubscription = generate(
      2,
      x => x <= 8,
      x => x + 3
    ).subscribe(data => this.generateEventRes = data);

    // Of Operator
    const ofObs$ = of({ name: 'Brian' }, [1, 2, 3], function hello() {
      return 'Hello';
    });
    this.ofSubscription = ofObs$.subscribe(data => this.ofRes = data);

    // Range Operator
    const rangeObs$ = range(1, 10);
    this.rangeSubscription = rangeObs$.subscribe(data => this.rangeRes = data);

    // Throw Error Operator
    const errorObs$ = throwError('This is a error');
    this.throwErrSubscription = errorObs$.subscribe({
      next: val => console.log(val),
      complete: () => console.log('comp'),
      error: (err) => this.throwErrRes = err
    });

    // Timer Operator
    const timerObs$ = timer(1000, 2000);
    this.timerSubscription = timerObs$.subscribe(data => this.timerRes = data);

    // iif Operator
    let accessGranted;
    const observableIfYouHaveAccess = iif(
      () => accessGranted,
      of('It seems you have an access...'), // Note that only one Observable is passed to the operator.
    );

    accessGranted = true;
    this.iifSubscription = observableIfYouHaveAccess.subscribe(
      value => this.iifRes = value,
      err => { },
      () => this.iifRes = 'The end',
    );

    accessGranted = false;
    this.iifSubscription = observableIfYouHaveAccess.subscribe(
      value => this.iifRes = value,
      err => { },
      () => this.iifRes = 'The end',
    );

  }

  ngOnDestroy() {
    if (this.ofSubscription) { this.ofSubscription.unsubscribe(); }
    if (this.ajaxSubcription) { this.ajaxSubcription.unsubscribe(); }
    if (this.bindCallBackSubscription) { this.bindCallBackSubscription.unsubscribe(); }
    if (this.deferSubscription) { this.deferSubscription.unsubscribe(); }
    if (this.emptySubscription) { this.emptySubscription.unsubscribe(); }
    if (this.fromEventSubscription) { this.fromEventSubscription.unsubscribe(); }
    if (this.fromSubscription) { this.fromSubscription.unsubscribe(); }
    if (this.generateSubscription) { this.generateSubscription.unsubscribe(); }
    if (this.iifSubscription) { this.iifSubscription.unsubscribe(); }
    if (this.rangeSubscription) { this.rangeSubscription.unsubscribe(); }
    if (this.throwErrSubscription) { this.throwErrSubscription.unsubscribe(); }
    if (this.timerSubscription) { this.timerSubscription.unsubscribe(); }
  }

}
