import {contentNotifier} from "./contentNotifier";
import {contentInterfacer} from "./contentInterfacer";
import {ContentManager} from "./ContentManager";

/**
 * gets new data from backend in background
 */
export abstract class abstractListener {

  protected slug: string;
  protected notifier: contentNotifier;
  protected interfacer: contentInterfacer;
  protected manager: ContentManager;

  constructor(slug: string) {
    this.slug = slug;
    this.notifier = new contentNotifier();
    this.interfacer = new contentInterfacer(this.slug);
  }
  abstract check(slug: string);

  compareUpdate(data: string) {
    this.manager.compare();
  }
}
