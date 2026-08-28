export type Lesson = {
  id: string;
  title: string;
  description?: string | null;
  videoId?: string | null;
  videoUrl?: string | null;
  duration?: number | null;
  order: number;
  isFree: boolean;
};

export type LessonEditorData = {
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
  isFree: boolean;
};
