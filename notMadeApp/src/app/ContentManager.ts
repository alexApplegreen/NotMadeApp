import { NativeStorage} from "@ionic-native/native-storage";

/**
 * loads hash from latest content,
 * compares old with new content
 */
export class ContentManager {

  private slug: string;
  private data: any;
  private storage: NativeStorage;

  constructor(slug: string, data: any) {
    this.slug = slug;
    this.storage = new NativeStorage();
    this.data = data;
  }

  /**
   * returns true if content is new
   */
  compare() {
    let a = this.storage.getItem(this.slug);
    return a === this.data;
  }
}
