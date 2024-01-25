export interface LoggedInUser {
  name: string;
  email: string;
  id: string;
}

export interface Session {
  user: LoggedInUser | null | undefined;
}

export type Member = {
  id: number;
  address: string;
  password: string;
  name: string;
  role: Role;
  email: string;
  imageLink: string;
};
export type User = {
  id: number;
  name: string;
  password: string;
  role: string;
  email: string;
  address: string;
  imageLink: string;
  posts: Array<Post>;
};
export enum Role {
  MEMBER = "MEMBER",
  ADMIN = "ADMIN",
}

export type Post = {
  [x: string]: any;
  id: string;
  title: string;
  description: string | null;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string | null;
};
// Define TypeScript type for the Profile model
export type Profile = {
  id?: number;
  bio?: string;
  member?: Member;
  memberId?: number;
};

// Define TypeScript type for the Category model
export type Category = {
  id?: number;
  name?: string;
  description?: string;
  post: Post[];
};
