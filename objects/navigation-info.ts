export class NavigationInfo {
  public key: number;
  public title: string;
  public badge?: string;

  constructor(key: number, title: string, badge?: string) {
    this.key = key;
    this.title = title;
    this.badge = badge;
  }
}
