export interface IHeroes {
  id: number;
  name: string;
  age: number;
  power: string;
}

export interface IApiResponse {
  status: boolean;
  error?: string;
}
