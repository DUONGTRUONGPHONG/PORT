export interface Comment {
  id?: number;
  siteId: number,
  replyId: number,
  userId: number,
  userToken: string,
  content: string,
  isFeatured: boolean,
  publishedBy: number,
  publishedOn: string,
  publicationDate: string,
  order: number,
  status: string,
  createdBy: number,
  createdOn: string,
  updatedBy: string,
  updatedOn: string
}
