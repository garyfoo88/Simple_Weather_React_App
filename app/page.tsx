"use client";
import { getWeatherForecast, WeatherForecastData } from "@/actions/forecast";
import Image from "next/image";
import { useState, useTransition } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

export default function Home() {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<WeatherForecastData>();
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState<WeatherForecastData[]>([]);

  const onSubmit = async (value: string) => {
    setError("");
    startTransition(async () => {
      const res = await getWeatherForecast(value);
      if (res?.status === "error") {
        setData(undefined);
        setError(res.data as string);
      }
      if (res.status === "success") {
        setHistory((prevHistory: WeatherForecastData[]) => [
          ...prevHistory,
          res.data as WeatherForecastData,
        ]);
        setData(res.data as WeatherForecastData);
      }
    });
  };

  const handleDelete = (indexToDelete: number) => {
    setHistory((prevHistory: WeatherForecastData[]) =>
      prevHistory.filter(
        (_: WeatherForecastData, index: number) => index !== indexToDelete
      )
    );
  };

  return (
    <div className="flex flex-col gap-32 mt-4 items-start w-full">
      {/* Search bar section */}
      <div className="flex w-full gap-5">
        <div className="relative grow max-w-[620px]">
          <label
            htmlFor="search"
            className="absolute top-1 left-5 text-[8px] pointer-events-none text-gray-500 sm:text-[10px]"
          >
            Country
          </label>
          <input
            id="search"
            type="text"
            className="text-[12px] bg-white bg-opacity-20 w-full h-[40px] pt-4 pb-2 pl-5 pr-2 border-none rounded-[8px] focus:outline-none sm:h-[60px] sm:rounded-[20px] sm:text-[16px]"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <button
          disabled={!search || isPending}
          onClick={() => {
            onSubmit(search);
          }}
          className="flex items-center justify-center w-[40px] h-[40px] bg-royal-purple text-white border-none rounded-[8px] focus:outline-none hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed sm:w-[60px] sm:h-[60px] sm:rounded-[20px]"
        >
          <IoSearchSharp className="w-[27px] h-[27px] sm:w-[34px] sm:h-[34px]" />
        </button>
      </div>
      
      {/* Weather card section */}
      <div className="flex justify-center w-full h-full bg-white bg-opacity-20 border-none rounded-[20px]">
        <div className="flex align-middle w-full ml-5 mr-5 flex-col mt-[60px] gap-2">
          {error && <div className="text-red-500">{error}</div>}
          {data ? (
            <>
              <div className="relative flex justify-between">
                <div className="text-[14px] sm:text-[16px]">
                  Today's Weather
                </div>
                <Image
                  src={
                    data.weather?.main === "Rain" ? "/cloud.png" : "/sun.png"
                  }
                  alt="Description of the image"
                  width={200}
                  height={200}
                  className="absolute bottom-[-50px] right-[-10px] sm:w-[300px] sm:h-[300px] sm:bottom-[-125px]"
                />
              </div>
              <div className="flex justify-between leading-none">
                <div className="self-end text-[70px] text-royal-purple font-bold sm:text-[105px]">
                  {data.weather?.temp}°
                </div>
                <div className="self-end block sm:hidden text-gray-500">
                  {data.weather?.main}
                </div>
              </div>
              <div className="flex text-[14px] sm:text-[16px] justify-between leading-none">
                <div className="self-end">
                  H: {data.weather.high}° L: {data.weather.low}°
                </div>
                <div className="self-end block sm:hidden text-gray-500">
                  Humidity: {data.weather?.humidity}%
                </div>
              </div>
              <div className="flex text-[14px] sm:text-[16px] justify-between leading-none text-gray-500">
                <div className="self-end font-bold">
                  {data.location?.name}, {data.location?.countryCode}
                </div>
                <div className="self-end hidden sm:block">
                  {data.weather?.main}
                </div>
                <div className="self-end hidden sm:block">
                  Humidity: {data.weather?.humidity}%
                </div>
                <div className="self-end">{data.date}</div>
              </div>
            </>
          ) : (
            <div>Search for a city or country</div>
          )}

          {/* Search history section */}
          <div className="flex text-[14px] sm:text-[16px] justify-center w-full h-full bg-white bg-opacity-25 border-none rounded-[20px] mt-4">
            <div className="flex align-middle w-full ml-4 mr-4 flex-col mt-[30px] gap-5">
              <div>Search History</div>
              {history.map(({ location, date }, index: number) => (
                <div
                  key={index}
                  className="flex justify-between w-full h-14 bg-white bg-opacity-30 border-none rounded-[20px]"
                >
                  <div className="self-center ml-5 flex flex-col">
                    <div>
                      {location?.name}, {location?.countryCode}
                    </div>
                    <div className="block text-[10px] sm:hidden sm:text-[16px]">
                      {date}
                    </div>
                  </div>

                  <div className="flex self-center flex-row mr-5 gap-2">
                    <div className="h-full text-[14px] self-center hidden sm:block">
                      {date}
                    </div>
                    <button
                      onClick={() => {
                        onSubmit(location?.name);
                      }}
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
                    >
                      <IoSearchSharp className="text-gray-500 w-[16px] h-[16px]" />
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(index);
                      }}
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow"
                    >
                      <MdDelete className="text-gray-500 w-[16px] h-[16px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
