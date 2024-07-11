"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import amazonLogo from "../public/amazon-logo-2.webp";
import { BiCart } from "react-icons/bi";
import { CgSearch } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/supabase/hooks/redux";
import { getCart } from "@/redux/cartSlice";
import { supabase } from "@/lib/supabase/products";

const Header = () => {
  const [query, setQuery] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const cart = useAppSelector(getCart);

  const searchHandler = () => {
    router.push(`/search/${query}`);
  };

  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="bg-[#131921] text-white py-1">
        <div className="flex flex-wrap items-center justify-between w-[90%] mx-auto">
          <Link href={"/"} className="w-[10%]">
            <Image src={amazonLogo} alt={"logo"} width={150} height={150} />
          </Link>
          <div className="flex items-center w-[50%] sm:w-[58%]">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="w-full p-2 rounded-l-md outline-none text-black"
              placeholder="Search Amazon.in"
            />
            <div
              onClick={searchHandler}
              className="bg-[#FEBD69] p-2 cursor-pointer hover:bg-[#ffad43] rounded-r-md"
            >
              <CgSearch size={"24px"} className="text-black" />
            </div>
          </div>
          <div className="flex items-center justify-around w-[40%] sm:w-[30%] mt-2 sm:mt-0">
            <div
              onClick={() => {
                router.push("/signin");
              }}
              className="cursor-pointer"
            >
              <h1 className="text-xs hover:underline">
                {user ? user?.identities[0]?.identity_data.full_name : "Signin"}
              </h1>
              <h1 className="font-medium text-sm">Account & Lists</h1>
            </div>
            <div>
              <p className="text-xs">Returns</p>
              <h1 className="font-medium text-sm">& Orders</h1>
            </div>
            <Link href={"/cart"} className="cursor-pointer relative">
              <p className="absolute top-0 left-6 bg-red-600 text-white rounded-full px-2 text-xs">
                {cart.length}
              </p>
              <div className="flex">
                <div>
                  <BiCart size={"40px"} />
                </div>
                <h1 className="mt-4">cart</h1>
              </div>
            </Link>
            <div className="cursor-pointer">
              <h1
                onClick={async () => {
                  const { error } = await supabase.auth.signOut();
                  router.push("/signin");
                }}
                className="text-[#FEBD69] font-bold hover:underline"
              >
                Sign out
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
