export interface Course {
  id: number;
  courseName: string;
  credits: number;
  description: string;
}

export interface CreateCourseDto {
  courseName: string;
  credits: number;
  description: string;
}

export interface UpdateCourseDto {
  courseName: string;
  credits: number;
  description: string;
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