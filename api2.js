const mysql = require('mysql2/promise');

async function insertData() {
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'tableConsultTest',
    });

    const tipos = ['SUS', 'Particular', 'P.Saude'];
    const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
    const lista = [];

    for (let i = 0; i < 200; i++) {
        const tipo = tipos[Math.floor(Math.random() * tipos.length)];
        const mes = meses[Math.floor(Math.random() * meses.length)];
        const quantidade = Math.floor(Math.random() * 1000);
        const ano = (2020 + Math.floor(Math.random() * 4)).toString();
        lista.push({ tipo, mes, ano, quantidade });
    }

    try {
        await connection.beginTransaction();
        for (const item of lista) {
            const sql = 'INSERT INTO consultas (tipo, mes, ano, quantidade) VALUES (?, ?, ?, ?)';
            const values = [item.tipo, item.mes, item.ano, item.quantidade];
            await connection.query(sql, values);
        }
        await connection.commit();
        console.log('Dados inseridos com sucesso!');
    } catch (err) {
        await connection.rollback();
        console.error('Erro ao inserir dados:', err);
    } finally {
        connection.close();
    }
}

insertData();
