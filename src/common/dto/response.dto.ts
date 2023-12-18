export class ResponseDTO<T> {
  data: T;
  message: string = 'success';
  count: number;
}
