# Brewster

## Intro

This is a demo project for the [GrNodeDev](http://www.meetup.com/grnodedev/) 2014-11-06 meetup: [Node Howto: How to Setup a Build Process](http://www.meetup.com/GRNodeDev/events/209772552/).

We will be building a HTTP REST API that interacts with the with the [BreweryDB REST API](http://www.brewerydb.com/developers).

Brewster exposes two simple REST APIs:

1. `/api/breweries?name=[search]` returns a list of breweries matching the name

2. `/api/beers?name=[brewery]` returns the beers for that brewery

## Scaffolding Setup

1. Install Node.js (which includes `node` and `npm`) from here: [http://nodejs.org](http://nodejs.org/)

2. Install the [Express.js generator CLI app](http://expressjs.com/) globally (`-g`):

    ```
    npm install -g express-generator
    ```

3. Use `express` to scaffold a new app for you:

    ```
    express myapp
    ```

4. Go into your myapp directory and install all of the required modules:

    ```
    cd myapp
    npm install
    ```

5. Start your new app via:

    ```
    npm start
    ````

6. Test your blank website at:

    [http://localhost:3000](http://localhost:3000)

## Brewster REST API

1. Install the [`request`](https://www.npmjs.org/package/request) NPM module so we can interact with the BreweryDB API:

    ```
    npm install --save request
    ```

2. Use the REST API routes we created at `routes/api.js`

3. Change `app.js` to serve up your new API routes:

    ```
    var api = require('./routes/api');
    app.use('/api', api);
    ```

## Testing

1. Install [`mocha`](https://www.npmjs.org/package/mocha), a test framework:

    ```
    npm install -g mocha
    ```

2. Run Tests

    ```
    mocha
    ```

## Building

1. Install [`gulp`](http://gulpjs.com), a streaming build system

    ```
    npm install -g gulp
    ```

2. Clean

    ```
    gulp clean
    ```

3. Build

    ```
    gulp build
    ```

## Deploying

TODO
