type Category = {
  id: string;
  name: {
    name_en: string;
  };
  parent_id: string | null;
  image: string | null;
};

type ErrorDetails = {
  message: string;
  code: string;
  details?: string;
};

type GetCategoriesResponse = {
  getCategories: {
    success: boolean;
    total: number;
    data: Category[];
    error?: ErrorDetails;
  };
};