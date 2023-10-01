const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const cors = require('cors');
const session = require('express-session'); // To set the session object. To store or access session data, use the `req.session`, which is (generally) serialized as JSON by the store.


const db = pgp({
    host: 'db', // the host name MYSQL_DATABASE: node_mysql
    user: process.env.POSTGRES_USER, // database user MYSQL_USER: MYSQL_USER
    password: process.env.POSTGRES_PASSWORD, // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
    database: process.env.POSTGRES_DB, // database name MYSQL_HOST_IP: mysql_db
})

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
    })
);
const user = {
    username: undefined,
    password: undefined
}
app.get('/', (req, res) => {
    res.send('Hi There')
});

app.post('/login', (req, res) => {
    const loginQuery = `SELECT password FROM users WHERE user_name = '${req.body.setUserName}';`;
    db.query(loginQuery).then((data) => {
        console.log('login data', data);
        if (req.body.setPassword !== data[0].password) {
            res.send({ failed: true, message: "Incorrect Password" });
        } else {
            user.username = req.body.username;
            user.password = data.password;
            req.session.user = user;
            req.session.save();
            res.send({ failed: false, message: 'Logged in successfully' });
        }
    }).catch(err => res.send({ failed: true, message: err.datail }));
})

app.put('/register', (req, res) => {
    const checkUserName = `SELECT * FROM users WHERE user_name = '${req.body.setUserName}';`;
    db.query(checkUserName).then(result => {
        console.log('Check query result', checkUserName, result);
        if (result.length > 0) {
            res.send({ message: 'Username taken' });
        } else {
            const registerQuery = `INSERT INTO users (user_name, password) VALUES ('${req.body.setUserName}', '${req.body.setPassword}') RETURNING *;`
            db.query(registerQuery)
                .then((result) => {
                    console.log('register insert result', result);
                    result.length > 0 ?
                        res.send({ message: 'Registered Successfully' }) :
                        res.send({ message: 'Registration failed' });
                })
                .catch(err => {
                    console.log('There was an err at /register', err);
                    res.send({ message: 'Failed to register' });
                });
        }
    }).catch(err => console.log('There was an error selecting users', err));
});


app.get('/get', (req, res) => {
    if (!req.session.user) {
        res.send({ loggedIn: false });
    } else {
        res.send({ loggedIn: true });
    }
})

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.send({ message: 'Logged out successfully' });
});


app.listen('3001', () => { console.log("Listening on port 3001!") })