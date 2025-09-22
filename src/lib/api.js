import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: async (headers) => {
      const clerk = window.Clerk;
      if (clerk) {
        const token = await clerk.session.getToken();
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      // return new Promise(async (resolve) => {
      //   async function checkToken() {
      //     const clerk = window.Clerk;
      //     if (clerk) {
      //       const token = await clerk.session.getToken();
      //       if (token) {
      //         headers.set("Authorization", `Bearer ${token}`);
      //         resolve(headers);
      //       }
      //     } else {
      //       setTimeout(checkToken, 500);
      //     }
      //   }
      //   checkToken();
      // });
    },
  }),
  tagTypes: ["Hotel", "Location"],
  endpoints: (build) => ({
    getAllHotels: build.query({
      query: () => "hotels",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Hotel", _id })),
              { type: "Hotel", id: "LIST" },
            ]
          : [{ type: "Hotel", id: "LIST" }],
    }),

    getAllLocations: build.query({
      query: () => "location",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Location", _id })),
              { type: "Location", id: "LIST" },
            ]
          : [{ type: "Location", id: "LIST" }],
    }),

    addHotel: build.mutation({
      query: (hotel) => ({
        url: "hotels",
        method: "POST",
        body: hotel,
      }),
      invalidatesTags: [{ type: "Hotel", id: "LIST" }],
    }),

    addLocation: build.mutation({
      query: (location) => ({
        url: "location",
        method: "POST",
        body: {
          name: location.name,
        },
      }),

      invalidatesTags: [{ type: "Location", id: "LIST" }],
    }),

    getHotelById: build.query({
      query: (id) => `/hotels/${id}`,
      providesTags: (result, error, _id) => [{ type: "Hotel", _id }],
    }),

    addReview: build.mutation({
      query: (review) => ({
        url: "reviews",
        method: "POST",
        body: review,
      }),
      invalidatesTags: [{ type: "Review", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllHotelsQuery,
  useGetAllLocationsQuery,
  useGetHotelByIdQuery,
  useAddLocationMutation,
  useAddReviewMutation,
  useAddHotelMutation,
} = api;
