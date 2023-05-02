
import axios from 'axios';
import "chart.js/auto";
import '../../index.css';
import ChartPie from "../../components/ChartPie";
import React, {useEffect, useRef, useState} from 'react';
import ChartBar from "../../components/ChartBar";
import ChartLine from "../../components/ChartLine";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";


function Cirurgias() {
    const [data, setData] = useState([]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2023);
    const titleRef = useRef();
    useEffect(() => {
        document.title = "Cirurgias";
        axios.get('http://localhost:45454/api/consulta/cirurgia/2023')
            .then(response => setData(response.data))
            .catch(error => console.error(error));
        axios.get('http://localhost:45454/api/listYears')
            .then(response => setYears(response.data))
            .catch(error => console.error(error));
    }, []);


    const consultYear = ()=>{

        axios.get(`http://localhost:45454/api/consulta/cirurgia/${selectedYear}`)
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }

    const handleYearChange= (event) => {
        setSelectedYear(event.target.value);
    };

    return (
        <div className="w-full">

            <Header titleRef={titleRef}></Header>
            <SideBar/>
            <div className="grid grid-cols-2 gap-4">
                <div
                    className=" w-112 h-96 bg-white mt-8 ml-12 mr-12 p-8 rounded-md shadow-lg hover:scale-105 ease-out duration-300  ">
                    <ChartBar data={data}/>
                </div>
                <div
                    className=" h-96 bg-white mt-8 ml-12 mr-12 p-8 rounded-md shadow-lg hover:scale-105 ease-out duration-300 mr-8  ">
                    <ChartPie data={data}/>
                </div>
            </div>
            <div className="bg-white mt-12 ml-12 p-8 rounded-md shadow-lg hover:scale-105 ease-out duration-300 mr-8 ">
                <ChartLine data={data} width={"1200"} height={"290"}/>
            </div>
            <br/>
            <div className="flex flex-no-wrap justify-center gap-4 bg-white-200 mb-4 mt-4">
                <div>
                    <select defaultValue="" onChange={handleYearChange} className="block appearance-none w-full bg-black-200 border border-gray-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        <option value="" disabled hidden>Ano</option>
                        {years.map((year) => (
                            <option key={year.value} value={year.value}>
                                {year.text}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button
                        className="bg-green-600 hover:bg-green-500 text-white font-bold  border border-green-400 py-2 px-4 rounded w-24"
                        onClick={()=>{
                            consultYear();
                            titleRef.current.innerHTML = selectedYear;
                        }}
                    >
                        Buscar
                    </button>
                </div>
            </div>

        </div>

    );
}

export default Cirurgias;
