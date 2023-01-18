export interface IHero {
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
  heroe: IHero;
}
