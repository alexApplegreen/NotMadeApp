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
    this.contentListener = new contentUpdateListener("gigs-upcoming");
    this.data = this.contentListener.run();
  }

}
