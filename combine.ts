import {combineLatest, Observable} from "rxjs";

export function combine() {
    combineLatestFunction();
}

function combineLatestFunction() {
    const firstObservable = new Observable(observer => {
        slowProcessing(() => observer.next(`task 1.`), 100);
        slowProcessing(() => observer.next(`task 2.`), 200);
        slowProcessing(() => observer.next(`task 3.`), 300);
    });

    const secondObservable = new Observable(observer => {
        slowProcessing(() => observer.next(`task a.`), 100);
        slowProcessing(() => observer.next(`task b.`), 200);
        slowProcessing(() => observer.next(`task c.`), 300);
    });

    combineLatest([firstObservable, secondObservable])
        .subscribe(([first, second]) => {
                console.log(`${first}-${second}`);
            }
        );
    /**
     task 1.-task a.
     task 2.-task a.
     task 2.-task b.
     task 3.-task b.
     task 3.-task c.
     */
}

function slowProcessing(handler: () => void, time?: number) {
    setTimeout(handler, Math.floor(time ? time : Math.random() * 1000));
}

