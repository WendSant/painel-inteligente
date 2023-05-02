import { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.register(ChartDataLabels);

function ChartPie({ data }) {
    const chartRef = useRef(null);
    const totalRef = useRef(null);
    const [chartPie, setChartPie] = useState(null);

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

        const percentageList = qtdTotal.map(qtd => ((qtd / totalCount) * 100).toFixed(2));
        let labelList = [
            `SUS (${percentageList[0]}%)`,
            `PARTICULAR (${percentageList[1]}%)`,
            `PLANO DE SAUDE (${percentageList[2]}%)`
        ];

        // totalRef.current.innerHTML = `Total: ${totalCount}`;

        const chart = new Chart(chartRef.current, {
            type: 'pie',
            data: {
                labels: labelList,
                datasets: [{
                    label: 'Quantidade',
                    data: qtdTotal,
                    borderWidth: 1,
                    backgroundColor: [
                        'rgb(0,128,0)',
                        'rgb(0,0,156)',
                        'rgb(255,165,0)',
                    ],
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                tooltips: {
                    enabled: false
                },
                plugins: {
                    datalabels: {
                        display: true,
                        color: "white",

                        labels: {
                            title: {
                                font: {
                                    weight: "bold"
                                }
                            },
                            value: {
                                color: "white"
                            },
                            render: 'percentage'
                        },
                        formatter: function (value) {
                            return ((value / totalCount) * 100).toFixed(2)+'%';
                        }
                    }
                }
            }
        });

        setChartPie(chart);

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

export default ChartPie;
