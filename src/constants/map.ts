export const MAP_INITIAL_RADIUS = 300; // 지도 초기 반경 값(임의))
export const MAP_MAX_LEVEL = 12; // 지도 줌아웃 최대 레벨 값
export const MAP_INITIAL_LEVEL = 3; // 지도 초기 레벨 값
export const LEVEL_TO_RADIUS = [0, 70, 150, 300, 600, 1300, 2700, 5500, 12000]; // 지도 레벨을 반경으로 매핑한 값
export const RADIUS_TO_LEVEL: { [key: string]: number } = {
  '2': 7,
  '5': 8,
  '7': 8,
  '10': 9,
}; // 반경을 지도 레벨로 매핑한 값

export const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};
