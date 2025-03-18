export type SignUpState = {
  SignUp: any;
  isLoading: boolean;
  error: string | null;
};
export type SignInState = {
  message: string | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
};
export type SignInData = {
  email: string;
  password: string;
};
export type AuthState = {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  token: string | null;
};
export type LoggedUserState = {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  photo?: string;
  createdAt: string;
};
export type Post = {
  _id: string;
  body: string;
  image?: string;
  user: User;
  createdAt: string;
  comments: Comments[];
};
export type User = {
  _id: string;
  name: string;
  photo: string;
};
export type Comments = {
  _id: string;
  content: string;
  commentCreator: User;
  post: string;
  createdAt: string;
};
export type PostDataState = {
  body: string;
  image: string | null;
  isLoading: boolean;
  error: string | null;
};
export type PostData = {
  body: string;
  image: File | null;
};