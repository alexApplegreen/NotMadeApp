import {hash} from "./hash";
import {contentInterfacer} from "./contentInterfacer";
import { BackgroundFetch, BackgroundFetchConfig } from '@ionic-native/background-fetch';
import {Device} from "@ionic-native/device";
import {contentNotifier} from "./contentNotifier";

// TODO make this abstract, specialize for android / IOS
export class contentUpdateListener {

  private device: Device;

  private contentSlug: string;
  private interfacer: contentInterfacer;
  private config: BackgroundFetchConfig;
  private backgroundFetch: BackgroundFetch;

  constructor(contentSlug: string) {

    this.device = new Device();
    this.contentSlug = contentSlug;

    this.config = {
      stopOnTerminate: false,
    };

    this.backgroundFetch = new BackgroundFetch();

    this.interfacer = new contentInterfacer(this.contentSlug);
  }

  public run():string {
    if (this.device.platform !== "Android") {
      this.backgroundFetch.configure(this.config).then(() => {
        console.log("Initialized backgroundfetch.");
        let data = this.interfacer.getContent();
        if (data === 'failed') {
          this.backgroundFetch.finish();
          return '404 no data received from cosmic';
        }
        else {
          let h = new hash(data).hash();
          // TODO check hash of data for new content, save hash.
          // TODO implement notifier & fix this
          let notifier = new contentNotifier();
          notifier.notifyUser("new Update! ");
          this.backgroundFetch.finish();
          return data;
        }
      }).catch(e => console.log("backgroundfetch failed", e));
    }
    else {
      // TODO fetch data android style
      return "";
    }
  }
}

