import { CanDeactivateFn } from "@angular/router";
import { CanLeave } from "./can-leave.interface";

export const canLeaveGuard: CanDeactivateFn<CanLeave> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  return component.canLeave();
};
