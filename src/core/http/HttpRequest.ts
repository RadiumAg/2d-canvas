import { HttpResponse } from './HttpResponse';
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
}
