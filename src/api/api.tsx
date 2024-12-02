// query data api
export const queryData = async (props: { url: string }) => {
  const header = new Headers();
  const options: RequestInit = {
    method: "GET",
    headers: header,
    credentials: "include",
  };

  const response = await fetch(
    process.env.NEXT_PUBLIC_API_BASE_URL + props.url,
    options
  );

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    return response;
  }
};

// update API
export const updateAPI = async (props: { url: string; body: {} }) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var options: RequestInit = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(props?.body),
    credentials: "include",
    redirect: "follow",
  };
  const fullUrl = process.env.NEXT_PUBLIC_API_BASE_URL + props.url;
  try {
    const response = await fetch(fullUrl, options);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    return response.json();
  } catch (error: any) {
    return { error: error.message };
  }
};

// create or post API
export const postAPI = async (props: { url: string; body: {} }) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var options: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(props?.body),
    credentials: "include",
  };
  const fullUrl = process.env.NEXT_PUBLIC_API_BASE_URL + props.url;
  try {
    const response = await fetch(fullUrl, options);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    return response.json();
  } catch (error: any) {
    return { error: error.message };
  }
};

// create or post API
export const deleteAPI = async (props: { url: string }) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var options: RequestInit = {
    method: "DELETE",
    headers: myHeaders,
    credentials: "include",
  };
  const fullUrl = process.env.NEXT_PUBLIC_API_BASE_URL + props.url;
  try {
    const response = await fetch(fullUrl, options);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
    return response.json();
  } catch (error: any) {
    return { error: error.message };
  }
};
