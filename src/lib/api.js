
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
    tagTypes: ['Hotel', 'Location'],
  endpoints: (build) => ({
    getAllHotels: build.query({
      query: () => 'hotels',
        providesTags: (result) =>
            result
                ? [
                    ...result.map(({ _id }) => ({ type: 'Hotel', _id })),
                    { type: 'Hotel', id: 'LIST' },
                ]
                : [{ type: 'Hotel', id: 'LIST' }],
    }),

       getAllLocations:build.query({
           query:()=> 'location',
           providesTags: (result) =>
               result
                   ? [
                       ...result.map(({ _id }) => ({ type: 'Location', _id })),
                       { type: 'Location', id: 'LIST' },
                   ]
                   : [{ type: 'Location', id: 'LIST' }],
       }),

        addLocation:build.mutation({
            query:(location) =>({
                url:'location',
                method:'POST',
                body:{
                    name:location.name
                }
            }),

            invalidatesTags: [{ type: 'Location', id: 'LIST' }],
        }),

       getHotelById:build.query({
           query:(id) => `/hotels/${id}`,
           providesTags: (result, error, _id) => [{ type: 'Hotel', _id }],
       })



  }),
})

export const {useGetAllHotelsQuery,useGetAllLocationsQuery,useGetHotelByIdQuery,useAddLocationMutation  } = api
