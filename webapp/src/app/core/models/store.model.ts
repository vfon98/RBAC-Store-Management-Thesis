export type ISimpleStaff = {
  id: number;
  name: string;
  email: string;
  isManager?: boolean;
  roles?: [
    {
      id: number;
      name: string;
      grantable: boolean;
      level: number;
      craetedAt: number;
    }
  ];
};

export type IStore = {
  id: number;
  name: string;
  address: string;
  latitude?: number;
  longitude?: number;
  email: string;
  phone: string;
  status: StatusType;
  createdAt: number;
  quantity?: number;
};

export enum StatusType {
  Closed = 'Closed',
  Open = 'Open',
}
