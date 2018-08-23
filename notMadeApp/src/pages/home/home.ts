import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Device} from "@ionic-native/device";
import { iosContentUpdateListener } from "../../app/iosContentUpdateListener";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  data: string;
  private device: Device;

  constructor(public navCtrl: NavController) {
    this.device = new Device();

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

}
