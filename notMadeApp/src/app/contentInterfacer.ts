
import * as request from 'request-promise-native';
export class contentInterfacer {

  private slug: string;
  private bucket: any;

  constructor(slug: string) {
    this.slug = slug;
  }

  public async getContent() {
    let baseUrl = 'http://localhost:1337/';
    var options = {
      uri: baseUrl + this.slug,
      dataType: 'application/json',
    };
    let response = await request.get(options);
    let result = JSON.parse(response);
    return result;
  }
}
