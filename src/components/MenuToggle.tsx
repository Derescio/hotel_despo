'use client'
import React, { useState } from 'react'
import { LuMenu } from "react-icons/lu";
import SideBar from './SideBar';

const MenuToggle = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className=" w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <LuMenu onClick={toggleSidebar} className="cursor-pointer text-2xl" />
            </div>
            <SideBar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </>
    );
}

export default MenuToggle;
