export class CommentModel {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public author: string,
    public createdOn: number
  ) { }
}