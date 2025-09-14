import { IoMdMenu } from "react-icons/io";
import { AiOutlineGlobal } from "react-icons/ai";
import { Link } from "react-router";
import  {increment} from "@/lib/features/counterSlice.js";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();


  return (
    <nav className="bg-black/90 rounded-full mx-4! my-3! px-6! py-3!  flex justify-between relative ">
      <div className="flex justify-center items-center gap-6 text-xl font-bold capitalize text-white  ">
        <Link to="/">horizone</Link>
        <Link
          to="/"
          className=" text-sm h-10 w-14 font-extralight rounded-md hover:bg-slate-200 hover:text-black   justify-center items-center text-white  hidden md:flex transition-all duration-300 ease-in-out"
        >
          Home
        </Link>
        <p>{count}</p>
        <button onClick={()=> dispatch(increment())}>add</button>
      </div>
      <div className=" cursor-pointer flex  font-bold text-white absolute top-2 right-6 gap-3">
        <Menu>
          <button className="flex h-10 w-10 rounded-md hover:bg-slate-200 hover:text-black   justify-center items-center text-white md:hidden transition-all duration-300 ease-in-out">
            <IoMdMenu onClick={() => setIsMenuOpen((prev) => !prev)} />
          </button>
        </Menu>

        <button className="cursor-pointer text-sm font-extralight h-10  w-18 rounded-md hover:bg-slate-200 hover:text-black   justify-center items-center text-white  hidden md:flex gap-2 transition-all duration-300 ease-in-out">
          <AiOutlineGlobal />
          <span>En</span>
        </button>

        <Link
          className=" text-sm h-10 w-14 font-extralight rounded-md hover:bg-slate-200 hover:text-black   justify-center items-center text-white  hidden md:flex transition-all duration-300 ease-in-out"
          to="/sign-in"
        >
          Sign In
        </Link>

        <Link
          className=" text-xs font-light h-10 w-16  rounded-md bg-slate-200 text-black   justify-center items-center   hidden md:flex transition-all duration-300 ease-in-out"
          to="/sign-up"
        >
          Sign Up
        </Link>
      </div>
      {isMenuOpen && <Menu />}
    </nav>
  );
};

export default Navigation;

const Menu = ({ children }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-40 bg-black text-white">
        <ul className="">
          <li className="py-2! px-3! hover:bg-slate-200 hover:text-black    transition-all duration-300 ease-in-out">
            <a href="">Home</a>
          </li>
          <li className="py-2! px-3! hover:bg-slate-200 hover:text-black    transition-all duration-300 ease-in-out">
            <a href="">En</a>
          </li>
          <li className="py-2! px-3! hover:bg-slate-200 hover:text-black    transition-all duration-300 ease-in-out">
            <a href="">Login</a>
          </li>
          <li className="py-2! px-3! hover:bg-slate-200 hover:text-black    transition-all duration-300 ease-in-out">
            <a href="">Sign Up</a>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};
