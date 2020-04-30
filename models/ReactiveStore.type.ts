import { Subject } from "rxjs";

export type ReactiveStore<S, E> = {
  subscribeTo$: Subject<S>,
  emitFrom$: Subject<E>
};