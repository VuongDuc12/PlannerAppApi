export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserDto {
  username: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserDto {
  username?: string;
  fullName?: string;
  email?: string;
  password?: string;
  role?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
} 