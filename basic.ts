import {of} from "rxjs";
import {map} from "rxjs/operators";

export function basic() {
    const dataSource = of(1, 2, 3, 4, 5);
    const subscription = dataSource
        .pipe(map(value => value + 1))
        .subscribe(value => console.log(value));
}