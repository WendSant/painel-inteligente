import React from 'react';

function Header({titleRef}) {
    return (
        <nav
            className="h-32 flex items-center lg:items-stretch justify-end lg:justify-between bg-white shadow relative z-10">
            <div className="hidden lg:flex w-full justify-center ">
                <div className=" bg-white flex flex-col justify-center items-center">
                    <h1 className="text-4xl text-gray-700 items-center">Cirurgias</h1>
                    <h1 ref={titleRef} className="text-4xl text-green-600 font-bold" >2023</h1>
                </div>
            </div>
            <button aria-label="Main Menu"
                    className="text-gray-600 mr-8 visible lg:hidden relative focus:outline-none focus:ring-2 focus:ring-gray-600 "
                    id="menu">
                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_header_and_icons-svg7.svg"
                     alt="toggler"></img>
            </button>
        </nav>
    );
}

export default Header;