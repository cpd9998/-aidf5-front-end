import HotelList from "./HotelList";

import { Skeleton } from "@/components/ui/skeleton";
import LocationTab from "@/components/Home/LocationTab.jsx";
import {
  useAddLocationMutation,
  useGetAllHotelsQuery,
  useGetAllLocationsQuery,
} from "../../lib/api.js";
import { useState } from "react";
import { toast } from "sonner";

const TrendingHotels = () => {
  const [selectedCountry, setSelectedCountry] = useState("all");
  const {
    data: hotels,
    isLoading: isHotelLoading,
    isError: isHotelError,
    error: hotelError,
  } = useGetAllHotelsQuery();
  const {
    data: locations,
    isLoading: isLocationsLoading,
    isError: isLocationError,
    error: locationError,
  } = useGetAllLocationsQuery();
  const [
    addLocation,
    {
      isLoading: isAddlocationLoading,
      isError: isAddlocationError,
      error: addLocationError,
    },
  ] = useAddLocationMutation();

  console.log(locations, "locations");

  const isLoading =
    isHotelLoading || isLocationsLoading || isAddlocationLoading;
  const isError = isHotelError || isLocationError || isAddlocationError;
  const error =
    hotelError?.error || locationError?.error || addLocationError?.error;

  const allLocations = locations ? [{ _id: 0, name: "all" }, ...locations] : [];

  const filtredHotels =
    selectedCountry === "all"
      ? hotels
      : hotels.filter(
          (hotel) => hotel.country === selectedCountry?.toLowerCase().trim()
        );

  if (isLoading) {
    return (
      <section className="px-8 mt-20">
        <h1 className="text-black text-4xl font-bold mb-4">
          Top trending hotels worldwide
        </h1>
        <p className="text-gray-500 text-lg font-extralight ">
          Discover the most trending hotels worldwide for an unforgettable
          experience.
        </p>
        <LocationTab
          locations={allLocations}
          setSelectedCountry={setSelectedCountry}
          selectedCountry={selectedCountry}
        />

        <Skeleton className="h-24 h-[125px] w-[250px] grid lg:grid-cols-4 md:grid-cols-2 gap-3 " />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="px-8 mt-20">
        <h1 className="text-black text-4xl font-bold mb-4">
          Top trending hotels worldwide
        </h1>
        <p className="text-gray-500 text-lg font-extralight ">
          Discover the most trending hotels worldwide for an unforgettable
          experience.
        </p>

        <p className=" mt-10 text-red-500">Something went wrong</p>
      </section>
    );
  }

  return (
    <section className="px-8 mt-20">
      <h1 className="text-black text-4xl font-bold mb-4">
        Top trending hotels worldwide
      </h1>
      {/* <button className="bg-green-300 text-white p-2 cursor-pointer hover:bg-green-500" onClick={async (e)=> {
            try {
                 e.preventDefault();
                await  addLocation({name:'Swedan'}).unwrap();
                toast.success('Location Added');

            }catch (e) {
                toast.error(e.message)
            }
        } }> Add Locations</button> */}
      <p className="text-gray-500 text-lg font-extralight ">
        Discover the most trending hotels worldwide for an unforgettable
        experience.
      </p>

      <LocationTab
        locations={allLocations}
        setSelectedCountry={setSelectedCountry}
        selectedCountry={selectedCountry}
      />

      <HotelList hotels={filtredHotels} />
    </section>
  );
};

export default TrendingHotels;
