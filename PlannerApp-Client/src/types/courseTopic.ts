export interface CourseTopic {
  id: number;
  courseId: number;
  topicName: string;
  description: string;
  course?: {
    id: number;
    courseName: string;
  };
}

export interface CreateCourseTopicDto {
  courseId: number;
  topicName: string;
  description: string;
}

export interface UpdateCourseTopicDto {
  topicName: string;
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