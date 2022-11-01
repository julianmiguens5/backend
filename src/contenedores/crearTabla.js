//Config DB
import knex from 'knex';
import connection from './db.js';
import sqliteConfig from './SQLite3.js';

const Knex = knex(connection)
const KnexSQLite3 = knex(sqliteConfig)

Knex.schema.createTable('productos', tabla =>{
    tabla.increments('id')
    tabla.string('name')
    tabla.integer('price')
    tabla.string('category')
    tabla.string('img')
    tabla.integer('stock')
    tabla.string('description')
  })
  .then(() => console.log("tabla creada"))
  .catch((e) => { console.log('Error!', e); throw e;})
  .finally(() => {
    Knex.destroy();
  });


KnexSQLite3.schema.createTableIfNotExists("chat", (table) => {
    table.increments("id");
    table.string("date");
    table.string("email");
    table.string("msg");
    }).then(() => {
        console.log("Tabla creada");
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        KnexSQLite3.destroy();
    });

