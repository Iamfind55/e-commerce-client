export interface BrandingName {
  name_en: string;
}

export interface BrandingData {
  id: string;
  name: BrandingName;
  images?: string[];
  status?: string | null;
  created_at?: string | null;
}

export interface GetBrandingResponse {
  getBrandings: {
    success: boolean;
    data: BrandingData[];
    error?: ErrorDetails;
  };
}
