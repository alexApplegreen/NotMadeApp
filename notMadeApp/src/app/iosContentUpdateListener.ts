import { abstractListener } from "./abstractListener";
import { BackgroundFetch, BackgroundFetchConfig} from "@ionic-native/background-fetch";
import {contentNotifier} from "./contentNotifier";
import {contentInterfacer} from "./contentInterfacer";
import { hash } from "./hash";

export class iosContentUpdateListener extends abstractListener {

  private config: BackgroundFetchConfig;
  private backgroundFetch: BackgroundFetch;
  private interfacer: contentInterfacer;
  private notifier: contentNotifier;
  private data: string;
  private dataAvailable: boolean;

  constructor(slug: string) {
    super(slug);
    this.dataAvailable = false;
    this.notifier = new contentNotifier();
    this.interfacer = new contentInterfacer(this.slug);
    this.config = {
      stopOnTerminate: false
    };
    try {
      this.backgroundFetch.configure(this.config).then(() => {
        this.data = this.interfacer.getContent();
        let h = new hash(this.data).hash();
        // TODO check if data is new
        this.dataAvailable = true;
        this.notifier.notifyUser("news Available!");
      });
    }
    catch (e) {
      console.log("no IOS platform found. ", e.message);
    }
  }

  check():string {
    if (this.dataAvailable) {
      return this.data;
    }
    else {
      throw new Error();
    }
  }

}
