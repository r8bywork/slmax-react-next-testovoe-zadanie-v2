import type { PropsWithChildren } from "react";
import Bar from "@/components/Bar";

export default function PhotosLayout ({children}: PropsWithChildren<unknown>) {
    const sortByOptions = ["popularity", "date"];
    return <div>
        <Bar/>
        {children}
    </div>
}