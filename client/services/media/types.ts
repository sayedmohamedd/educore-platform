export type Media = {
  id: string;
  url: string;
  publicId: string;
  resourceType: string;
  filename: string;
  size: number;
  mimeType: string;
};

export type CreateMedia = {
  url: string;
  publicId: string;
  resourceType: string;
  filename: string;
  size: number;
  mimeType: string;
};
