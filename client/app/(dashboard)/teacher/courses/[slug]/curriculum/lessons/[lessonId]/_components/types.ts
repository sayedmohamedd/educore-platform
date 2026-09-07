export interface Lesson {
  id: string;
  title: string;
  description?: string | null;
  slug: string;
  duration: number;
  order: number;
  isFree: boolean;

  videoId?: string | null;

  video?: {
    id: string;
    url: string;
  } | null;
}

export interface LessonEditorData {
  title: string;
  description: string;
  videoId: string;
  videoUrl: string;
  duration: number;
  isFree: boolean;
}
