export class ContentInfoModel {
  constructor(_id: any,
    _title: string,
    _contentHidden: boolean,
    _description: string, _contentUrl: string) {
    this.id = _id;
    this.title = _title;
    this.contentHidden = _contentHidden;
    this.description = _description;
    this.contentUrl = _contentUrl;
  }
  id: any;
  title: string;
  description: string;
  contentHidden = false;
  contentUrl: string;
}
