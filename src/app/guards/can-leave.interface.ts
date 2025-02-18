import { Observable } from "rxjs";

export interface CanLeave {
  canLeave: () => boolean | Promise<boolean> | Observable<boolean>;
}
