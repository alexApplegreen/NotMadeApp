import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {contentUpdateListener} from "../../app/contentUpdateListener";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  data: string;

  private contentListener: contentUpdateListener;

  constructor(public navCtrl: NavController) {
    try {
      this.contentListener = new contentUpdateListener("gigs-upcoming");
      this.data = this.contentListener.run();
    }
    catch (e) {
      this.data = "404 no data received";
    }
    finally {
      console.log(this.data);
    }
  }

}
