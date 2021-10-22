const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');

// SEQUELIZE
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// EXPRESS AND PORTS
const app = express();
const PORT = process.env.PORT || 3001;

// HANDLEBARS
const hbs = exphbs.create({helpers});

const sess = {
	secret: "super secret secret",
	cookie: {},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize
	})
};

app.use(session(sess));

// CONNECT EXPRESS + HANDLEBARS
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// EXPRESS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log(`Now listening - http://localhost:${PORT}`));
});