import { abstractListener } from "./abstractListener";
import { BackgroundFetch, BackgroundFetchConfig } from "@ionic-native/background-fetch";

/**
 * specifies abstract class abstractListener
 */
export class iosContentUpdateListener extends abstractListener {

  private config: BackgroundFetchConfig;
  private backgroundFetch: BackgroundFetch;
  private data: string;
  private dataAvailable: boolean;

  /**
   * constructor, starts backgroundFetch
   * @param {string} slug
   */
  constructor(slug: string) {
    super(slug);

    this.dataAvailable = false;

    // configure backgroundFetch
    this.config = {
      stopOnTerminate: false
    };

    // start backgroundfetch request to IOS
    try {
      this.backgroundFetch.configure(this.config).then(() => {
        this.data = this.interfacer.getContent();
        this.dataAvailable = true;
        this.compareUpdate(this.data);
        this.notifier.notifyUser("news Available!");
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

  /**
   * get Availability of data
   * @returns {boolean}
   */
  getAvailability():boolean {
    return this.dataAvailable;
  }

}
