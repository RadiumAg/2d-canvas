export type HttpResponse = {
  success: boolean;
  responseType: XMLHttpRequestResponseType;
  response: string | ArrayBuffer | Blob | null;
};
