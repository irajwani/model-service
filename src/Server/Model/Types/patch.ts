export enum Operations {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
}

export interface IPatch {
  op: Operations;
  path: string;
  value: string;
}
