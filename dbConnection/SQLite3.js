const sqliteConfig = {
    client: 'sqlite3',
    connection: {
        filename: '../db/ecommerce.sqlite'
    },
    useNullAsDefault: true
};

export default sqliteConfig;
