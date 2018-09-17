import { abstractListener } from "./abstractListener";
import { BackgroundFetch, BackgroundFetchConfig } from "@ionic-native/background-fetch";
import { NativeStorage} from "@ionic-native/native-storage";

/**
 * specifies abstract class abstractListener
 */
export class iosContentUpdateListener extends abstractListener {

  private config: BackgroundFetchConfig;
  private backgroundFetch: BackgroundFetch;
  private data: any;
  private storage: NativeStorage;

  // specifies, wether new Data can be queried
  private dataAvailable: boolean;

  /**
   * constructor, starts backgroundFetch
   * @param {string} slug
   */
  constructor(slug: string) {
    super(slug);

    this.dataAvailable = false;
    this.storage = new NativeStorage();

    // configure backgroundFetch
    this.config = {
      stopOnTerminate: false
    };

    // start backgroundfetch request to IOS
    // callback is executed at every background fetch.
    try {
      this.backgroundFetch.configure(this.config).then(() => {
        // update field data with data from interfacer
        this.data = this.interfacer.getContent();
        // if manager returns true, the content is new.
        if (this.compareUpdate(this.data)) {
          // write required data for later checkup
          this.storage.setItem(this.slug, this.data);
          this.dataAvailable = true;
          this.notifier.notifyUser("news Available!");
        }
        this.backgroundFetch.finish();
      });
    }
    catch (e) {
      console.log("no IOS platform found. ", e.message);
    }
  }

  /**
   * returns data which is updated by backgroundFetch
   * @returns {string}
   * @throws Error in case of field data was not updated since last call of check()
   */
  check():string {
    if (this.dataAvailable) {
      return this.data;
    }
    else {
      throw new Error();
    }
  }

}
