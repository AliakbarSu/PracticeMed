export interface Video {
  id: string;
  title: string;
  description: string;
  topic: string;
  thumbnails: {
    id: string;
    width: number;
    url: string;
  };
  objectKey: string;
}
