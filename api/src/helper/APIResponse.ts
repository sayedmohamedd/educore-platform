export class ApiResponse<T> {
  constructor(
    public success: boolean,
    public message: string,
    public data?: T,
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
