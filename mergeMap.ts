import {interval} from "rxjs";
import {mergeMap, take} from "rxjs/operators";

export function runMergeMap() {
    const source = interval(1000);

    source.pipe(
        mergeMap(
            val => interval(5000).pipe(take(10)),
            (oval, ival, oIndex, iIndex) => [oIndex, oval, iIndex, ival],
            2
        )
    ).subscribe(val => console.log(val));
}
