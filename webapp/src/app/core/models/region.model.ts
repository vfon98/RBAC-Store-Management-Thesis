import { IStore } from './store.model';

export class IRegion {
  id: number;
  name: string;
  description?: string;
  numberOfStore?: number;
  stores?: IStore[];
}

export class IRegionBody {
  name: string;
  description: string;
}
