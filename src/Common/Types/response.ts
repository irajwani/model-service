import { Response } from 'express';

export type TResponse<T> = Response<any, Record<string, T>>;
