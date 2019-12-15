import {Observable, of, timer} from "rxjs";
import {shareReplay, timeInterval} from "rxjs/operators";

export function basicMulticasting() {
    const dataSource = timer(100, 200).pipe(shareReplay());
    const firstSubscriber = dataSource.subscribe(value => {
        console.log(`first-subscriber: ${value}`);
    });

    setTimeout(() => {
        const secondSubscriber = dataSource.subscribe(value => {
            console.log(`second-subscriber: ${value}`)
        })
    }, 1000)

    /**
     first-subscriber: 0
     first-subscriber: 1
     first-subscriber: 2
     first-subscriber: 3
     first-subscriber: 4
     second-subscriber: 0
     second-subscriber: 1
     second-subscriber: 2
     second-subscriber: 3
     second-subscriber: 4
     first-subscriber: 5
     second-subscriber: 5
     first-subscriber: 6
     second-subscriber: 6
     */
}

let counter: number = 0;

// compare this with doubleSubscriber
export function shareReplayForHeavyComputation() {
    const observable = new Observable(observer => {
        slowProcessing(() => observer.next(`task a. Execution no: ${counter++}`));
        slowProcessing(() => observer.next(`task b. Execution no: ${counter++}`));
        slowProcessing(() => observer.next(`task c. Execution no: ${counter++}`));
    }).pipe(shareReplay());

    const firstSubscriber = observable.subscribe(value => {
        console.log(`first-subscriber: ${value}`);
    });

    setTimeout(() => {
        // this will re-trigger the slowProcessing inside the observable
        const secondSubscriber = observable.subscribe(value => {
            console.log(`second-subscriber: ${value}`)
        })
    }, 1000);
}

function slowProcessing(handler: () => void) {
    setTimeout(handler, Math.floor(Math.random() * 1000));
}

