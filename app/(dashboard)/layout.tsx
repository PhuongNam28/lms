import React from "react";
import  Sidebar  from "./_components/sidebar"
const DashBoardLayOut = ({children
}:{children: React.ReactNode}) => {
    return ( 
        <div className="h-full">
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">

                <Sidebar></Sidebar>
            </div>
            {children}</div>
     );
}
 
export default DashBoardLayOut;