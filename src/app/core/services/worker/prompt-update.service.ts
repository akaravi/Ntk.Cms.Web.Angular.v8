import { Injectable } from "@angular/core";
import { SwUpdate, VersionReadyEvent } from "@angular/service-worker";
import { filter } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class PromptUpdateService {

  constructor(swUpdate: SwUpdate) {
    if (swUpdate.isEnabled)
      swUpdate.versionUpdates
        .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
        .subscribe(evt => {
          if (environment.production) {
            if (confirm("New version available. Load New Version?")) {
              window.location.reload();
            }
          } else {
            // Reload the page to update to the latest version.
            //document.location.reload();
          }
        });
  }

}


