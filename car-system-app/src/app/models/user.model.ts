export class UserModel {
  constructor(
    public email: string,
    public password: string,
    public name: string
  ) { }
}

export class UserProfile {
  constructor(
    public image: string,
    public name: string,
    public location: string,
    public biography: string
  ) { }
}