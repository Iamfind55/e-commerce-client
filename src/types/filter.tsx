export interface FilterState {
  page: number;
  offset: number;
  sort_by: string;
  order_by: string;
  start_date: string;
  end_date: string;
  filter: FilterType | null;
}

export interface FilterType {
  search: string;
  status: string;
}
