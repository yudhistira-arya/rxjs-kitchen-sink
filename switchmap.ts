import {interval, timer} from "rxjs";
import {switchMap} from "rxjs/operators";

export function runSwitchMap() {
    timer(0, 5000)
        .pipe(
            switchMap(
                _ => interval(2000),
                (outerValue, innerValue, outerIndex, innerIndex) => ({
                    outerValue,
                    innerValue,
                    outerIndex,
                    innerIndex
                })
            )
        )
        /*
          Output:
          {outerValue: 0, innerValue: 0, outerIndex: 0, innerIndex: 0} -> 1st outer observable
          {outerValue: 0, innerValue: 1, outerIndex: 0, innerIndex: 1}
          {outerValue: 1, innerValue: 0, outerIndex: 1, innerIndex: 0} -> 2nd outer observable, the previous inner
                                                                          observable is cancelled
          {outerValue: 1, innerValue: 1, outerIndex: 1, innerIndex: 1}
      */
        .subscribe(console.log);
}