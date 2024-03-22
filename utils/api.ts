import { CustomError } from "@/objects";

/* INTERFACES / TYPES */
type IRequestMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE";

function createRequest(method: IRequestMethod) {
  /* DEFAULT OPTIONS FOR FETCH API */
  const url = buildUrl();

  return async (path: string, body?: any, options?: any) => {
    //FETCH API
    const config = { method, body, ...options };
    const res = await $fetch(url + path, config);

    //IF ERROR
    if (!res) {
      let error = null as CustomError | null;
      return Promise.reject(error);

      //IF SUCCESS
    } else return res;
  };
}

function buildUrl() {
  const protocol = "https",
    host = "portal-api-stable.vpress.vn",
    port = "",
    version = "api-v1";

  return `${protocol}://${host}${port ? ':' + port : ''}/${version}`;
}

export const api = {
  get: createRequest("GET"),
  post: createRequest("POST"),
  put: createRequest("PUT"),
  patch: createRequest("PATCH"),
  delete: createRequest("DELETE"),
  connect: createRequest("CONNECT"),
  options: createRequest("OPTIONS"),
  trace: createRequest("TRACE"),
};
