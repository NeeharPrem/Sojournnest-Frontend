import { Link, useLocation } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { AiTwotoneMessage } from "react-icons/ai";
import { LuTableProperties } from "react-icons/lu";
import { ReactNode } from 'react';

interface NavLinkProps {
    to: string;
    className?: string;
    children: ReactNode;
}

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const NavLink = ({ to, className, children }: NavLinkProps) => {
        const location = useLocation();

        const isActive = (path: string) => location.pathname === path;

        if (isActive(to)) {
            return <div className={className}>{children}</div>;
        } else {
            return <Link to={to} className={className}>{children}</Link>;
        }
    };

    return (
        <div className='flex flex-col w-80 lg:p-4 justify-between'>
            <div className='flex flex-col lg:gap-3 '>
                <NavLink to='/dashboard' className='hover:cursor-pointer '>
                    <div className={`flex max-w-60 flex-row items-center gap-2 hover:shadow-md p-2 rounded-md item-center ${isActive('/dashboard') ? 'border-b-4 border-black-500' : ''}`}>
                        <FaHome />
                        <p>Dashboard</p>
                    </div>
                </NavLink>
                <NavLink to='/reservations' className='hover:cursor-pointer '>
                    <div className={`flex max-w-60 flex-row items-center gap-2 hover:shadow-md p-2 rounded-md item-center ${isActive('/reservations') ? 'border-b-4 border-black-500' : ''}`}>
                        <TbBrandBooking />
                        <p>Reservations</p>
                    </div>
                </NavLink>
                <NavLink to='/chats' className='hover:cursor-pointer '>
                    <div className={`flex flex-row items-center gap-2 max-w-60 hover:shadow-md p-2 rounded-md item-center ${isActive('/chats') ? 'border-b-4 border-black-500' : ''}`}>
                        <AiTwotoneMessage />
                        <p>Messages</p>
                    </div>
                </NavLink>
            </div>
            <div className='flex flex-col lg:gap-3 '>
                <NavLink to='/host' className='hover:cursor-pointer '>
                    <div className={`flex flex-row items-center gap-2 max-w-60 hover:shadow-md p-2 rounded-md item-center ${isActive('/host') ? 'border-b-4 border-black-500' : ''}`}>
                        <LuTableProperties />
                        <p>Listings</p>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}
export default Sidebar;
