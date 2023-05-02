import React from 'react';
import '../../index.css';
import logoLaureno from '../../assets/logo/logoLaureano.png'
import arrowLeft from '../../assets/icons/ArrowLeft.svg'
import arrowRight from '../../assets/icons/ArrowRight.svg'
import {NavLink} from "react-router-dom";
import { ReactComponent as CirurgiaIcon } from '../../assets/icons/cirurgiaIcon.svg';
import { ReactComponent as ConsultaIcon } from '../../assets/icons/consultasIcon.svg';
import { ReactComponent as UrgenciaIcon } from '../../assets/icons/urgenciaIcon.svg';
import { ReactComponent as InternacoesIcon } from '../../assets/icons/internacoesIcon.svg';
function SideBar({children}) {

    const menuItem = [
        {
            path: '/',
            name: "Cirurgias",
            icon: <CirurgiaIcon/>
        },
        {
            path: '/consultas',
            name: "Consultas",
            icon: <ConsultaIcon/>
        },
        {
            path: '/urgencias',
            name: "Urgências",
            icon: <UrgenciaIcon/>
        },
        {
            path: '/internacoes',
            name: "Internações",
            icon: <InternacoesIcon/>
        }

    ];


    return (
        <div className='flex flex-no-wrap group'>
            <div className="absolute lg:relative w-64 shadow bg-gray-100 ">
                <div className=''>
                    <div className="h-16 flex items-center mr-3 ml-4 mt-4">
                        <img src={logoLaureno} alt="logo"/>
                    </div>
                    <div className="arrow">
                        <img src={arrowLeft}/>
                    </div>
                </div>
                <ul className="py-6">
                    {
                        menuItem.map((item, index)=>(
                            <li key={index} className={"pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mb-4 py-2 hover:text-green-600 focus:text-indigo-700 focus:outline-none"}
                            >
                            <NavLink to={item.path}  className="flex items-center" activeclassName="active">
                                <div className="icon">{item.icon}</div>
                                <div className="ml-2">{item.name}</div>
                            </NavLink>
                            </li>
                        ))
                    }
                </ul>

            </div>
            <main>{children}</main>
        </div>
    );
}

export default SideBar;