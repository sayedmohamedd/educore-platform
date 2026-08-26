/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
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

export class ApiFeatures {
  static getPagination(query: any) {
    const page = query.page ? parseInt(query.page, 10) : 1;
    const limit = query.limit ? parseInt(query.limit, 10) : 10;
    const skip = (page - 1) * limit;

    return { page, limit, skip };
  }

  static getSorting(
    query: any,
    defaultField = 'createdAt',
    defaultOrder = 'desc',
  ) {
    const sortBy = query.sortBy || defaultField;
    const order = query.order === 'asc' ? 'asc' : defaultOrder;

    return { [sortBy]: order };
  }
}
