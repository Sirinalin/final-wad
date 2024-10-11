"use client"
import * as React from 'react';
import Link from 'next/link';

export default function HomeV2() {
  return (
    <main>
      <div className="w-full h-full my-10 mx-10">
        <h1 className="font-bold text-xl mb-4">Stock App</h1>
        <p className="mb-4">Simple stock management</p>
        <div className="flex space-x-4">
          <Link href="/product" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Products
          </Link>
          <Link href="/category" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Categories
          </Link>
          <Link href="/customer" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
            Customers
          </Link>
        </div>
      </div>
    </main>
  );
}