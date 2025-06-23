export type UserDto = {
  id: string;
  email: string;
  name?: string;
  role?: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserDto = {
  email: string;
  password: string;
  name: string;
  role?: "admin" | "user";
};
