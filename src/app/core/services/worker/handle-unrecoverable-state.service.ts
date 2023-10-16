import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";

@Injectable()
export class HandleUnrecoverableStateService {
  constructor(swUpdate: SwUpdate) {
    swUpdate.unrecoverable.subscribe(event => {
      notifyUser(
        'An error occurred that we cannot recover from:\n' +
        event.reason +
        '\n\nPlease reload the page.'
      );
    });
  }
}
function notifyUser(arg0: string) {
  throw new Error("Function not implemented." + arg0);
}

