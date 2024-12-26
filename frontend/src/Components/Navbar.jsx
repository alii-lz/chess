import React from "react";
import Knight from "../Images/Knight.svg";

const Navbar = () => {
    return (
        <nav className='bg-gray-800'>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                <div className='relative flex h-16 items-center justify-between'>
                    <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                        <div className='flex shrink-0 items-center'>
                            <img
                                className='h-8 w-auto'
                                src={Knight}
                                alt='Your Company'
                            />
                        </div>
                        <div className='hidden sm:ml-6 sm:block'>
                            <div className='flex space-x-4'>
                                <a
                                    href='#'
                                    className='rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white'
                                    aria-current='page'
                                >
                                    Dashboard
                                </a>
                                <a
                                    href='#'
                                    className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                                >
                                    Play
                                </a>
                                <a
                                    href='#'
                                    className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                                >
                                    Friends
                                </a>
                                <a
                                    href='#'
                                    className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                                >
                                    Profile
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
