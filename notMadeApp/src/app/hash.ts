// TODO

import {Md5} from "ts-md5";

export class hash {

  private data: string;

  constructor(data: string) {
    this.data = data;
  }

  public hash() {
    var hash;
    if (hash = Md5.hashAsciiStr(this.data)) {
      return hash;
    }
    else {
      console.log("Hashing failed!");
      return null;
    }
  }
}
