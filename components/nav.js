import React, { useState } from "react";
import Link from "next/link";

function Nav() {
  return (
    <nav class="flex items-center justify-between flex-wrap bg-slate-200 p-6">
    <div class="flex items-center flex-shrink-0 mr-6">
    <Link href="/">
        <a className="font-semibold text-xl tracking-tight hover:underline">AyD</a>
    </Link>
    </div>
    <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 border rounded hover:text-white hover:border-slate-600">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">

        </div>
        <div>
        <Link href="/residential">
            <a className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:underline">
                Residential
            </a>
        </Link>
        <Link href="/posts/post1">
            <a className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:underline">
                Cultural
            </a>
        </Link>
        <Link href="/posts/post1">
            <a className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:underline">
                Commercial
            </a>
        </Link>
        <Link href="/posts/post1">
            <a className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:underline">
                Previous Work
            </a>
        </Link>
        <Link href="/posts/post1">
            <a className="block mt-4 lg:inline-block lg:mt-0 mr-4 hover:underline">
                About
            </a>
        </Link>
        </div>
    </div>
    </nav>
  );
}

export default Nav;
