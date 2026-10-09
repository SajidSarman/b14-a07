"use client"

import { use } from "react";
import { io } from "next/cache";

const CurrentDate = () => {
    use(io());

    return (
        <>
            {new Date().toLocaleDateString("bn-BD", { dateStyle: "full" })}
        </>
    );
};

export default CurrentDate;