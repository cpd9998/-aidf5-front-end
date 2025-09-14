import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./page/home-page";
import { BrowserRouter, Routes, Route } from "react-router";
import SignIn from "./page/sign-in.page.jsx";
import SignUp from "./page/sign-up.page.jsx";
import RootLayoutPage from "./components/layout/root-layout.page.jsx";
import NotFoundPage from "@/page/not-found.page.jsx";
import Hotel from "@/page/hotel.page.jsx";
import HotelDetailPage from "@/page/hotel-detail.page.jsx";
import { store } from './lib/store.js'
import { Provider } from 'react-redux'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayoutPage />}>
          <Route index element={<HomePage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/hotels" element={<Hotel />} />
          <Route path="/hotels/:_id" element={<HotelDetailPage />} />
        </Route>
          <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
    </Provider>
  </StrictMode>
);
