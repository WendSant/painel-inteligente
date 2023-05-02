import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);

function ChartLine({ data, width, height }) {
    const chartRef = useRef(null);
    const [chartLine, setChartLine] = useState(null);
    const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
    const dataMonthsSUS = [];
    const dataMonthsPart = [];
    const dataMonthsPlano = [];

    const verifyType = (meses, data, totalSUS, totalPART, totalPlano)=>{
        for (let j = 0; j < meses.length; j++) {
            const mes = meses[j];
            for (let k = 0; k < data.length; k++) {
                const obj = data[k];
                if (obj.tipo === 'SUS' && obj.mes === mes) {
                    totalSUS.push(obj.quantidade);
                }else if(obj.tipo === 'Particular' && obj.mes === mes){
                    totalPART.push(obj.quantidade);
                }else if(obj.tipo === 'P.Saude' && obj.mes === mes){
                    totalPlano.push(obj.quantidade);
                }
            }
        }
    }
    useEffect(() => {
        if (!chartRef.current) {
            return;
        }
        let qtdTotal = [0, 0, 0];

        verifyType(meses, data, dataMonthsSUS, dataMonthsPart, dataMonthsPlano);
        const chart = new Chart(chartRef.current, {
            type: 'line',
            data: {
                labels: meses,
                datasets: [{
                    data: dataMonthsSUS,
                    label: "SUS",
                    backgroundColor: 'rgb(0,128,0)',
                    borderColor: '#4BBA4B',
                    fill: false
                }, {
                    data: dataMonthsPart,
                    label: "PARTICULAR",
                    backgroundColor: 'rgb(0,0,156)',
                    borderColor: '#4141D0',
                    fill: false
                }, {
                    data: dataMonthsPlano,
                    label: "PLANO DE SAUDE",
                    backgroundColor: 'rgb(255,165,0)',
                    borderColor: '#FFA500',
                    fill: false
                }
                ]
            },
            options: {

                responsive: true,
                tension: 0.5,
            }
        });

        setChartLine(chart);

        return () => {
            chart.destroy();
        };
    }, [data]);

    return (
        <>
            <canvas ref={chartRef} width={width} height={height}></canvas>
            {/*<div className="title" ref={totalRef}></div>*/}
        </>
    );
}

export default ChartLine;
