export interface IHeroe {
  id: number;
  name: string;
  age: number;
  power: string;
}

export interface IApiResponse {
  status: boolean;
  error?: string;
}

export interface DeleteDialogData {
  heroe: IHeroe;
}
