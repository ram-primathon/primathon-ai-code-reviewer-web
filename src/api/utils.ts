export const buildQueryParams = (params: Record<string, any>): string => {
  return new URLSearchParams(params).toString();
};

export const fetchWithAuth = async <T>(
  url: string,
  method: string = "GET",
  token: string = "",
  body: any = null,
  queryParams: Record<string, any> = {}
): Promise<T> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token !== "") {
    headers.Authorization = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const queryString = buildQueryParams(queryParams);
  const fetchUrl = `${url}?${queryString}`;

  try {
    const response = await fetch(fetchUrl, options);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    throw error;
  }
};
