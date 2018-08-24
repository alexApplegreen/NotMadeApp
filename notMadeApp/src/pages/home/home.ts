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

  data: string;
  gigs: string;
  private device: Device;

  /**
   * initially load content,
   * instantiates specific background content loading
   * @param {NavController} navCtrl
   */
  constructor(public navCtrl: NavController) {

    this.device = new Device();
    this.gigs = this.loadUpcomingGigs();

    if (this.device.platform !== 'Android') {
      let l = new iosContentUpdateListener('gigs-upcoming');
      try {
        this.data = l.check();
      }
      catch (e) {
        console.log("No new Data available.");
      }
    }
    else {
      // TODO instatiate android listener
      this.data = "no Android Listener avaiable yet."
    }
  }

  loadUpcomingGigs():string {
    let interfacer = new contentInterfacer('gigs-upcoming');
    return interfacer.getContent();
  }

}
