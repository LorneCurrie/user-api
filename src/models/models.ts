export interface IPostUser {
  email: string;
  first_name: string;
  last_name: string;
}

export interface IPutUser {
  email?: string;
  first_name?: string;
  last_name?: string;
}
