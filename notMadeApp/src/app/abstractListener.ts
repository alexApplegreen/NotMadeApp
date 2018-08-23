export abstract class abstractListener {

  protected slug: string;

  constructor(slug: string) {
    this.slug = slug;
  }
  abstract check(slug: string);
}
