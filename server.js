// Modules
const path = require('path');
const express = require('express');
const session = require('express-session');
const expHandlebars = require('express-handlebars');
// Files
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
// Sessions
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// Express and server ports
const app = express();
const PORT = process.env.PORT || 3001;
// Direction to handlebars to helper files
const handlebars = expHandlebars.create({helpers});
// parameters
const sess = {
  secret: process.env.secret,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
// Connect express and handlebars
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup static path to public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then( () => {
	app.listen(PORT, () => console.log( `Now listening at http://localhost:${PORT}` ));
});
