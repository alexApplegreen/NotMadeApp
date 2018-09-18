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

  gigs: string[];
  private device: Device;

  /**
   * initially load content,
   * instantiates specific background content loading
   * @param {NavController} navCtrl
   */
  constructor(public navCtrl: NavController) {

    this.gigs = [];
    this.device = new Device();

    // load initial content
    this.loadUpcomingGigs().then((res) => {
      for (let i = 0; i < res.length; i++) {
        console.log(res[i].name);
        this.gigs[i] = res[i].name;
      }
    });


    if (this.device.platform !== 'Android') {
      let l = new iosContentUpdateListener('gig');
      try {
        // update field with data from UpdateListener
        //this.gigs = l.check();
      }
      catch (e) {
        console.log("No new Data available.");
      }
    }
    else {
      // TODO instatiate android listener
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
