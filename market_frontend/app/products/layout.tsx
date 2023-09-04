"use client"

import { useStore } from "@/app/store";

export default function ProductsLayout({children}: {children: React.ReactNode}) {
	const { user } = useStore();

    return (
      <div>
        {children}
      </div>
    )

}
