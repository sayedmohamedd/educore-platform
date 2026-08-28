export type CurriculumLesson = {
  id: string;
  title: string;
  description?: string | null;
  videoId?: string | null;
  duration?: number | null;
  order: number;
  isFree: boolean;
};

export type CurriculumSection = {
  id: string;
  title: string;
  slug: string;
  order: number;
  lessons: CurriculumLesson[];
};

export type CurriculumCourse = {
  id: string;
  title: string;
  description?: string | null;
  sections: CurriculumSection[];
};

export type CreateSectionInput = {
  title: string;
  order: number;
};

export type CreateLessonInput = {
  title: string;
  description?: string;
  videoUrl?: string;
  duration: number;
  order: number;
  isFree?: boolean;
};
