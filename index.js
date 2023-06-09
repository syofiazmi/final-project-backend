const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const port = 3000
app.listen(port, () => {
    console.log(`Aplikasi sedang berjalan pada port: ${port}`)
})

// DATABASE MYSQL
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'store'
})

connection.connect()

connection.query('SELECT VERSION()', (error, result) => {
    if (error) {
        console.error('Koneksi gagal: ', error)
    } else {
        console.log('Koneksi berhasil', result)
    }
})


// GET 
app.get('/products', (req, res) => {
    connection.query('SELECT * FROM products', (error, results, fields) => {
        res.json(results)
    })
})

// POST
app.post('/products', (req, res) => {
    let input = req.body

    const insertQuery = 'INSERT INTO products (name, description, image, price) VALUES (?, ?, ?, ?)'

    const name = input.name
    const description = input.description
    const image = input.image
    const price = input.price

    const values = [name, description, image, price]

    connection.query(insertQuery, values, (error, results) => {
        console.log('data berhasil disimpan')
    })

    let response = {
        message: 'Data berhasil disimpan'
    }

    res.json(response)
})

// PUT
app.put('/products/:id', (req, res) => {
    let identifier = req.params.id
    let input = req.body

    const updateQuery = `UPDATE products SET name = ?, description = ?, image = ?, price = ? WHERE id = ${identifier}`

    const name = input.name
    const description = input.description
    const image = input.image
    const price = input.price

    const values = [name, description, image, price]

    connection.query(updateQuery, values, (error, results) => {
        console.log('data berhasil diupdate')
    })

    let response = {
        message: 'Data berhasil diupdate'
    }

    res.json(response)
})

// DELETE
app.delete('/products/:id', (req, res) => {
    let identifier = req.params.id
    
    const deleteQuery = `DELETE FROM products WHERE id = ${identifier}`
    const values = [identifier]

    connection.query(deleteQuery, values, (error, results) => {
        console.log('data berhasil dihapus')
    })

    let response = {
        message: 'Data berhasil dihapus'
    }

    res.json(response)
})