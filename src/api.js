
const express = require('express');
let conexao;
const app = express();
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });



app.use(cors());
app.get('/api/consulta/cirurgia/', (req, res) => {
    let objeto;
    const consulta = ``;


    conexao.execute(consulta, function(err, result) {
        if (err) {
            console.error(err.message);
            return;
        }

        const resultadoJson =  result.rows.map(item => ({
            tipo: item[0],
            mes: item[1],
            quantidade: item[2],
        }));
        res.json(resultadoJson);
    });
});


app.get('/api/consulta/cirurgia/:year', async (req, res) => {
    const { year } = req.params;

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        });

        const [rows] = await connection.execute(
            'SELECT * FROM consultas WHERE ano = ?',
            [year]
        );

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao consultar dados.' });
    }
});

app.get('/api/listYears', (req, res) => {
    const listAnos = [
        {
            text: '2005',
            value: '2005'
        },
        {
            text: '2006',
            value: '2006'
        },
        {
            text: '2007',
            value: '2007'
        },
        {
            text: '2008',
            value: '2008'
        },  {
            text: '2009',
            value: '2009'
        },
        {
            text: '2010',
            value: '2010'
        },
        {
            text: '2011',
            value: '2011'
        },
        {
            text: '2012',
            value: '2012'
        },  {
            text: '2013',
            value: '2013'
        },  {
            text: '2014',
            value: '2014'
        },
        {
            text: '2015',
            value: '2015'
        },
        {
            text: '2016',
            value: '2016'
        },
        {
            text: '2017',
            value: '2017'
        },
        {
            text: '2018',
            value: '2018'
        },
        {
            text: '2019',
            value: '2019'
        }
        ,
        {
            text: '2020',
            value: '2020'
        }
        ,
        {
            text: '2021',
            value: '2021'
        }
        ,
        {
            text: '2022',
            value: '2022'
        },
        {
            text: '2023',
            value: '2023',
        }
    ]

    res.json(listAnos);
});


app.listen(45454, () => {
    console.log('Servidor iniciado na porta 45454.');
});