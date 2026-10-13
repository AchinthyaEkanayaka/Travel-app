export type TemperatureUnit = 'C' | 'F';

export interface DayForecast {
  dayName: string; // e.g., "Tue", "Wed", "Thu"
  dateFormatted: string; // e.g., "Oct 14"
  condition: string; // e.g., "Sunny & Clear", "Misty Showers"
  iconType: 'sun' | 'cloud-sun' | 'rain' | 'cloud-rain' | 'cloud-fog' | 'wind';
  tempMaxC: number;
  tempMinC: number;
  rainChance: number; // percentage
}

export interface CityWeather {
  id: string;
  cityName: string;
  region: string; // e.g., "Central Highlands", "Southern Coast"
  elevation?: string; // e.g., "1,868 m elevation"
  currentTempC: number;
  feelsLikeC: number;
  condition: string;
  iconType: 'sun' | 'cloud-sun' | 'rain' | 'cloud-rain' | 'cloud-fog' | 'wind';
  humidity: number;
  uvIndex: number;
  windKmh: number;
  travelerTip: string;
  forecast3Day: DayForecast[];
}
