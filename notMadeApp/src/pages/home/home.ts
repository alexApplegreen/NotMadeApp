import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Device} from "@ionic-native/device";
import { iosContentUpdateListener } from "../../app/iosContentUpdateListener";
import { contentInterfacer} from "../../app/contentInterfacer";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  gigs: any;
  private device: Device;

  /**
   * initially load content,
   * instantiates specific background content loading
   * @param {NavController} navCtrl
   */
  constructor(public navCtrl: NavController) {

    this.device = new Device();

    // load initial content
    let data = this.loadUpcomingGigs().then((res) => {
      this.gigs = res[0].name;
    });

    if (this.device.platform !== 'Android') {
      let l = new iosContentUpdateListener('female-fronted-rock-night');
      try {
        // update field with data from UpdateListener
        this.gigs = l.check();
      }
      catch (e) {
        console.log("No new Data available.");
      }
    }
    else {
      // TODO instatiate android listener
      this.gigs = "no Android Listener avaiable yet."
    }
  }

  /**
   * used to initially load content from Cosmic bucket.
   * @returns {string} data from container
   */
  loadUpcomingGigs() {
    console.log("loaded initially");
    let interfacer = new contentInterfacer('gig');
    return interfacer.getContent();
  }

}
