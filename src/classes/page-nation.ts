export default class PageNation {
  constructor(readonly size: number, readonly page: number) {}

  json() {
    return {
      size: this.size,
      page: this.page,
    }
  }
}
