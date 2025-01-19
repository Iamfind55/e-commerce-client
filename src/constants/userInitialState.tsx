export const initialState = {
  user: {
    id: "",
    fullname: "",
    username: "",
    email: "",
    dob: "",
    remark: "",
    image: {
      logo: "",
      cover: "",
    },
    payment_method: {
      id: "",
      bank_name: "",
      code: "",
      bank_account_name: "",
      bank_account_number: "",
    },
    status: "",
    shop_vip: false,
    created_at: "",
  },
};

export const initialCustomerState = {
  customer: {
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone_number: "",
    dob: "",
    image: "",
    status: "",
    created_at: "",
  },
};
