export interface Location {
  sido: string;
  sgg: string;
  emd: string;
  latitude: string;
  longitude: string;
}

export interface MyNeighborhoods {
  locations: {
    '2': { sido: string; sgg: string; emd: string }[];
    '5': { sido: string; sgg: string; emd: string }[];
    '7': { sido: string; sgg: string; emd: string }[];
    '10': { sido: string; sgg: string; emd: string }[];
  };
  longitude: number;
  latitude: number;
  radius: number;
}
