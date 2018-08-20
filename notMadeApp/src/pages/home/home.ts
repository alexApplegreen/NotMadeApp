import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import Cosmic from 'cosmicjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public gigs;

  constructor(public navCtrl: NavController) {
      this.gigs = [];

      // do this in loop + fix bucket call
      this.reloadUpcomingGigs();
  }

  reloadUpcomingGigs() {
    Cosmic.getObjectType({
      bucket: {
        slug: 'gigs-upcoming'
      }
    }, {
      type_slug: 'upcoming gigs'
    }, (err, res) => {
      this.gigs = res.objecs.all;
    });
  }

}
