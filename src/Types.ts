export interface PetData {
  id?: number;
  userId?: number;
  lost?: boolean;
  objectID?: string;
  petname: string;
  petPhoto: string;
  lat: number;
  lng: number;
  location: string;
  description: string;
}

export interface PetReported {
  firstname: string;
  phone: string;
  description: string;
  petname: string;
  objectID: string;
  userId: number;
}

