import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);

function ChartBar({ data }) {
    const chartRef = useRef(null);
    const [chartBar, setChartBar] = useState(null);

    useEffect(() => {
        if (!chartRef.current) {
            return;
        }
        let totalCount = 0;
        let qtdTotal = [0, 0, 0];

        for (const obj of data) {
            totalCount += obj.quantidade;
            if (obj.tipo === 'SUS') {
                qtdTotal[0] += obj.quantidade;
            } else if (obj.tipo === 'Particular') {
                qtdTotal[1] += obj.quantidade;
            } else {
                qtdTotal[2] += obj.quantidade;
            }
        }

        let labelList = ['SUS', 'PARTICULAR', 'PLANO DE SAUDE']

        // totalRef.current.innerHTML = `Total: ${totalCount}`;

        const chart = new Chart(chartRef.current, {
            type: 'bar',
            data: {
                labels: labelList,
                datasets: [
                    {
                        label: labelList[0],
                        data: qtdTotal,
                        borderWidth: 1,
                        barThickness: 50,
                        backgroundColor: [
                            'rgb(0,128,0)',
                            'rgb(0,0,156)',
                            'rgb(255,165,0)',
                        ],
                    },
                    {
                        label: labelList[1],
                        data: qtdTotal[1],
                        borderWidth: 1,
                        barThickness: 50,
                        backgroundColor: 'rgb(0,0,156)'
                    },
                    {
                        label: labelList[2],
                        data: qtdTotal[2],
                        borderWidth: 1,
                        barThickness: 50,
                        backgroundColor: 'rgb(255,165,0)'
                    }


                ]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                width: 800,
                height: 400,

                plugins: {
                    datalabels: { // Colocando labels nas barras
                        anchor: 'end',
                        align: 'top',
                        formatter: function(value, context) { // função para retornar formato
                            return value.toLocaleString('pt-BR');
                        },
                        font: {
                            weight: 'bold',
                            size: 12
                        }
                    }
                }

            }
        });

        setChartBar(chart);

        return () => {
            chart.destroy();
        };
    }, [data]);

    return (
        <>
            <canvas ref={chartRef}></canvas>
            {/*<div className="title" ref={totalRef}></div>*/}
        </>
    );
}

export default ChartBar;
