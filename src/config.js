const config = {
    SQLite3: {
        client: 'sqlite3',
        connection: {
            filename: './DB/ecommerce.sqlite'
        },
        useNullAsDefault: true
    },
    MySQL: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            database: 'backend'
        },
    },
    Mongo: {
        uri: "mongodb://localhost:27017/ecommerce",
        options: {
            serverSelectionTimeoutMS: 5000,
        }
    },
    FireBase: {
        apiKey: "AIzaSyDrUaiRxAAVAgEl9dxOqyxGY7cVzLE9Zjg",
        authDomain: "flowit-react.firebaseapp.com",
        projectId: "flowit-react",
        storageBucket: "flowit-react.appspot.com",
        messagingSenderId: "195456964900",
        appId: "1:195456964900:web:90e628c0deb7701055fbb1"
    }
}

export default config;