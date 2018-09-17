
import * as request from 'request-promise-native';
export class contentInterfacer {

  private slug: string;
  private bucket: any;

  constructor(slug: string) {
    this.slug = slug;
  }

  public getContent() {
    let baseUrl = 'http://localhost:1337/';
    var options = {
      uri: baseUrl + this.slug,
    };
    let result = request.get(options);
    console.log(result);
    return result;
  }
}
