export interface Location {
  sido: string;
  sgg: string;
  emd: string;
  latitude: string;
  longitude: string;
}

export interface MyNeighborhoods {
  locations: {
    [key: string]: { sido: string; sgg: string; emd: string }[];
  };
  longitude: number;
  latitude: number;
  radius: number;
}
