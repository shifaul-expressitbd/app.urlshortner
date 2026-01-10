export interface Link {
  id: string;
  originalUrl: string;
  shortCode: string;
  customAlias?: string;
  shortUrl: string;
  qrCodeUrl?: string;
  title?: string;
  description?: string;
  totalClicks: number;
  isActive: boolean;
  hasPassword: boolean;
  expiresAt?: string;
  createdAt: string;
  folder?: {
    id: string;
    name: string;
    color: string;
  };
  tags?: {
    id: string;
    name: string;
    color: string;
  }[];
  domain?: {
    id: string;
    domain: string;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
