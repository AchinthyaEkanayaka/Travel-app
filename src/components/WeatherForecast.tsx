import React, { useState } from 'react';
import {
  Sun,
  CloudSun,
  CloudRain,
  CloudFog,
  Wind,
  Droplets,
  Compass,
  Thermometer,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { SRI_LANKA_CITIES_WEATHER } from '../data/weatherData';
import { CityWeather, TemperatureUnit } from '../types/weather';

interface WeatherForecastProps {
  onCitySelect?: (cityName: string) => void;
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ onCitySelect }) => {
  const [selectedCityId, setSelectedCityId] = useState<string>('sigiriya');
  const [unit, setUnit] = useState<TemperatureUnit>('C');

  const currentCity: CityWeather =
    SRI_LANKA_CITIES_WEATHER.find((c) => c.id === selectedCityId) ||
    SRI_LANKA_CITIES_WEATHER[0];

  // Temperature conversion helper
  const formatTemp = (celsius: number) => {
    if (unit === 'F') {
      return `${Math.round((celsius * 9) / 5 + 32)}°F`;
    }
    return `${celsius}°C`;
  };

  const formatTempNumberOnly = (celsius: number) => {
    if (unit === 'F') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return celsius;
  };

  // Weather icon selector
  const renderWeatherIcon = (
    iconType: string,
    sizeClasses = 'w-7 h-7',
    colorClasses = 'text-amber-500'
  ) => {
    switch (iconType) {
      case 'sun':
        return <Sun className={`${sizeClasses} ${colorClasses}`} strokeWidth={2} />;
      case 'cloud-sun':
        return <CloudSun className={`${sizeClasses} text-amber-500`} strokeWidth={2} />;
      case 'cloud-rain':
      case 'rain':
        return <CloudRain className={`${sizeClasses} text-sky-600`} strokeWidth={2} />;
      case 'cloud-fog':
        return <CloudFog className={`${sizeClasses} text-stone-500`} strokeWidth={2} />;
      case 'wind':
        return <Wind className={`${sizeClasses} text-sky-600`} strokeWidth={2} />;
      default:
        return <Sun className={`${sizeClasses} ${colorClasses}`} strokeWidth={2} />;
    }
  };

  return (
    <section className="w-full bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs">
      {/* Header with Title and °C / °F Unit Switcher */}
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            <Thermometer className="w-3.5 h-3.5 text-emerald-700" />
            <span>Sri Lanka Microclimates</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight mt-0.5">
            Destination Weather & Forecast
          </h2>
        </div>

        {/* Temperature Unit Switcher */}
        <div className="flex items-center bg-stone-100 p-0.5 rounded-xl border border-stone-200 text-xs font-semibold">
          <button
            onClick={() => setUnit('C')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              unit === 'C'
                ? 'bg-white text-stone-950 shadow-xs font-bold'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            °C
          </button>
          <button
            onClick={() => setUnit('F')}
            className={`px-2.5 py-1 rounded-lg transition-colors ${
              unit === 'F'
                ? 'bg-white text-stone-950 shadow-xs font-bold'
                : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            °F
          </button>
        </div>
      </div>

      {/* Horizontal City Navigation Tabs */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 mb-4 -mx-1 px-1">
        {SRI_LANKA_CITIES_WEATHER.map((city) => {
          const isSelected = city.id === selectedCityId;
          return (
            <button
              key={city.id}
              onClick={() => {
                setSelectedCityId(city.id);
                onCitySelect?.(city.cityName);
              }}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs transition-all shrink-0 font-medium ${
                isSelected
                  ? 'bg-emerald-900 text-white shadow-xs font-bold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
              }`}
            >
              <span>{city.cityName}</span>
              <span className="ml-1 opacity-70 text-[11px] font-normal">
                {city.currentTempC}°
              </span>
            </button>
          );
        })}
      </div>

      {/* Current Weather Card */}
      <div className="relative rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100/70 border border-stone-200/80 p-4 sm:p-5 overflow-hidden">
        {/* Subtle decorative aura */}
        <div className="absolute right-0 top-0 w-36 h-36 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left: City details & Big Temperature */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                {currentCity.region}
              </span>
              {currentCity.elevation && (
                <span className="text-[11px] text-stone-500 font-medium">
                  {currentCity.elevation}
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-3 mt-1.5">
              <span className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight tabular-nums">
                {formatTempNumberOnly(currentCity.currentTempC)}°
              </span>
              <div>
                <div className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                  {renderWeatherIcon(currentCity.iconType, 'w-4 h-4')}
                  <span>{currentCity.condition}</span>
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  Feels like {formatTemp(currentCity.feelsLikeC)}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Key microclimate metrics */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-stone-200/60 text-center text-xs">
            <div className="px-1">
              <div className="flex items-center justify-center text-sky-600 mb-0.5">
                <Droplets className="w-3.5 h-3.5" />
              </div>
              <div className="text-[10px] text-stone-500">Humidity</div>
              <div className="font-bold text-stone-900 tabular-nums">{currentCity.humidity}%</div>
            </div>

            <div className="px-1 border-x border-stone-200/70">
              <div className="flex items-center justify-center text-amber-500 mb-0.5">
                <Sun className="w-3.5 h-3.5" />
              </div>
              <div className="text-[10px] text-stone-500">UV Index</div>
              <div className="font-bold text-stone-900 tabular-nums">{currentCity.uvIndex}/10</div>
            </div>

            <div className="px-1">
              <div className="flex items-center justify-center text-stone-600 mb-0.5">
                <Wind className="w-3.5 h-3.5" />
              </div>
              <div className="text-[10px] text-stone-500">Wind</div>
              <div className="font-bold text-stone-900 tabular-nums">{currentCity.windKmh} km/h</div>
            </div>
          </div>
        </div>

        {/* Smart Traveler Advice Box */}
        <div className="mt-3.5 pt-3 border-t border-stone-200/60 flex items-start gap-2 text-xs text-stone-700">
          <Info className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-bold text-stone-900">Traveler Tip: </span>
            {currentCity.travelerTip}
          </p>
        </div>
      </div>

      {/* 3-Day Forecast Strip */}
      <div className="mt-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
          3-Day Travel Forecast
        </h3>

        <div className="grid grid-cols-3 gap-2">
          {currentCity.forecast3Day.map((day, idx) => (
            <div
              key={idx}
              className="bg-stone-50/90 rounded-2xl p-2.5 sm:p-3 border border-stone-200/70 flex flex-col justify-between text-center"
            >
              <div>
                <div className="text-xs font-bold text-stone-900">{day.dayName}</div>
                <div className="text-[10px] text-stone-400">{day.dateFormatted}</div>
              </div>

              {/* Icon */}
              <div className="my-2 flex justify-center">
                {renderWeatherIcon(day.iconType, 'w-6 h-6')}
              </div>

              <div className="text-[11px] text-stone-600 font-medium line-clamp-1 mb-1.5">
                {day.condition}
              </div>

              {/* High / Low Temp */}
              <div className="pt-1.5 border-t border-stone-200/60 flex items-center justify-center gap-1.5 text-xs">
                <span className="font-bold text-stone-900 tabular-nums">
                  {formatTempNumberOnly(day.tempMaxC)}°
                </span>
                <span className="text-[11px] text-stone-400 tabular-nums">
                  {formatTempNumberOnly(day.tempMinC)}°
                </span>
              </div>

              {/* Rain chance */}
              {day.rainChance > 15 && (
                <div className="mt-1 flex items-center justify-center gap-0.5 text-[10px] text-sky-700 font-medium">
                  <Droplets className="w-2.5 h-2.5" />
                  <span>{day.rainChance}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
