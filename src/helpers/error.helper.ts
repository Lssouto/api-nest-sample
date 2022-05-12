export class CustomError {
  status: number;
  from: string;
  error: any;

  constructor({ status, from, error }) {
    this.status = status;
    this.from = from;
    this.error = error;
  }
}
