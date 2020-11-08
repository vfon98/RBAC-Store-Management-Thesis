export class IImage {
  id: number;
  originalName: string;
  publicId: string;
  url: string;
  secureUrl: string;
  format?: string;
  bytes?: number;
  etag?: string;
  signature?: string;
  created_at?: string;
}
