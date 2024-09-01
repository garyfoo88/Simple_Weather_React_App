"use server";

import { getFormattedDate } from "@/lib/utils";

export type WeatherForecastData = {
  date: string;
  location: {
    name: string;
    countryCode: string;
  };
  weather: {
    main: string;
    temp: number;
    low: number;
    high: number;
    humidity: number;
  };
};

export const getWeatherForecast = async (
  query: string
): Promise<
  | {
      status: "error" | "success";
      data: string;
    }
  | {
      status: "error" | "success";
      data: WeatherForecastData;
    }
> => {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;

  if (!apiKey)
    return {
      status: "error",
      data: "Invalid api key",
    };

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;

  const response = await fetch(endpoint);

  if (!response.ok)
    return {
      status: "error",
      data: "Unable to get weather data",
    };

  const data = await response.json();

  if (data?.cod === 404)
    return {
      status: "error",
      data: "City or country not found",
    };

  const weatherData = {
    date: getFormattedDate(),
    location: {
      name: data.name,
      countryCode: data.sys?.country,
    },
    weather: {
      main: data.weather[0]?.main,
      temp: Math.floor(data.main?.temp),
      low: Math.floor(data.main?.temp_min),
      high: Math.floor(data.main?.temp_max),
      humidity: data.main?.humidity,
    },
  };
  return {
    status: "success",
    data: weatherData,
  };
};
