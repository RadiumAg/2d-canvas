import { HttpResponse } from './HttpResponse';

type RequestCB = (response: HttpResponse) => void;

export class HttpRequest {
  public static doGet(url: string): HttpResponse {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, false, null, null);
    xhr.send();

    if (xhr.status === 200) {
      return { success: true, responseType: 'text', response: xhr.response };
    } else {
      return { success: false, responseType: 'text', response: null };
    }
  }

  public static doGetAsync(
    url: string,
    callback: RequestCB,
    responseType: XMLHttpRequestResponseType = 'text',
  ) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = responseType;
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = {
          success: true,
          responseType,
          response: xhr.response,
        } satisfies HttpResponse;

        callback(response);
      } else {
        const response = {
          success: true,
          responseType,
          response: xhr.response,
        } satisfies HttpResponse;

        callback(response);
      }
    });
    xhr.open('get', url, true, null, null);
    xhr.send();
  }
}
