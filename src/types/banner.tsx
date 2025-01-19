type Banner = {
  id: string;
  name: string;
  image: string | null;
  link_url?: string;
  position?: string | null;
};

type GetBannersResponse = {
  getBanners: {
    success: boolean;
    total: number;
    data: Banner[];
    error?: ErrorDetails;
  };
};
