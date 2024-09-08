'use client'
import React, { useEffect, useState } from 'react'
import { LuMenu, LuHome, LuList, LuHotel, LuBed, LuBook, LuSettings, LuLogOut, LuAreaChart } from "react-icons/lu";
import { getUserProfile } from '@/config/getUserProfile';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

interface SideBarProps {
    isOpen: boolean;
    onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
    const [user, setUser] = useState<{ isAdmin?: boolean } | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    const { signOut } = useAuth();


    const onLogout = () => {
        signOut()
        router.push("/")
    }

    const userMenuItems: any[] = [

        {
            name: "Dashboard",
            icon: <LuHome size={25} />,
            onClick: () => router.push("/"),
            isActive: pathname === "/"
        },
        {
            name: "Bookings",
            icon: <LuBook size={25} />,
            onClick: () => router.push("/user/bookings"),
            isActive: pathname === "/user/bookings"
        },
        {
            name: "Profile",
            icon: <LuSettings size={25} />,
            onClick: () => router.push("/user/profile"),
            isActive: pathname === "/user/profile"
        }

    ]

    const adminMenuItems: any[] = [
        {
            name: "Dashboard",
            icon: <LuHome size={25} />,
            onClick: () => router.push("/"),
            isActive: pathname === "/"
        },
        {
            name: "Bookings",
            icon: <LuList size={25} />,
            onClick: () => router.push("/admin/bookings"),
            isActive: pathname === "/admin/bookings"
        },
        {
            name: "Hotels",
            icon: <LuHotel size={25} />,
            onClick: () => router.push("/admin/hotels"),
            isActive: pathname.includes("/admin/hotels")
        },
        {
            name: "Rooms",
            icon: <LuBed size={25} />,
            onClick: () => router.push("/admin/rooms"),
            isActive: pathname === "/admin/rooms"
        },
        {
            name: "reports",
            icon: <LuAreaChart size={25} />,
            onClick: () => router.push("/admin/reports"),
            isActive: pathname === "/admin/reports"
        },
    ]

    const menuToShow: any[] = user?.isAdmin ? adminMenuItems : userMenuItems

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUserProfile();
            setUser(userData);
        };
        fetchUser();
    }, []);

    const handleItemClick = (item: any) => {
        item.onClick();
        onClose();

    };
    const handleLogout = () => {
        onLogout();
        onClose();
    };

    return (
        <div className={`z-10 fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-[12px] ">

                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center ml-4">
                    <LuMenu onClick={onClose} className="cursor-pointer text-2xl" />
                </div>

                <h2 className="text-xl mt-4">Sidebar Content</h2>
                {/* Add your sidebar content here */}
                {menuToShow.map((item, index) => (
                    <div key={index} className={`flex items-center mt-4 cursor-pointer ${item.isActive ? ' bg-white text-gray-800' : ''}`} onClick={() => handleItemClick(item)}>
                        <div className={`w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center${item.isActive ? ' bg-white text-gray-800' : ''}`}>
                            {item.icon}
                        </div>
                        <span className="ml-4">{item.name}</span>
                    </div>
                ))}
            </div>
            <span className='ml-8 text-center cursor-pointer flex items-center gap-2' onClick={handleLogout}> <LuLogOut /> Logout </span>
        </div>
    )
}
export default SideBar
