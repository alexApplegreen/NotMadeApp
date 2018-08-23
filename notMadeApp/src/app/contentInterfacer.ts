import Cosmic from 'cosmicjs';

export class contentInterfacer {

  private slug: string;

  constructor(slug: string) {
    this.slug = slug;
  }

  public getContent() {
    // TODO get this running, use AJAX Api calls maybe?
    try {
      Cosmic.getObjectType({
        bucket: {
          slug: 'notmadeapp'
        }
      }, {
        type_slug: this.slug
      }, (err, res) => {
        return res.objects.all;
      });
    }
    catch (e) {
      console.log("no connection to bucket");
      return "failed";
    }
  }
}
