# Web Data Connector

Tableau web data connectors, linking tableau data format to APIs using JavaScript.

There are three web connectors at the moment:

* afval.html
* signals.html
* tellus.html

The web connectors are available on:
* https://acc.api.data.amsterdam.nl/webconnector/afval.html
* https://acc.api.data.amsterdam.nl/webconnector/signals.html
* https://acc.api.data.amsterdam.nl/webconnector/tellus.html
* https://api.data.amsterdam.nl/webconnector/afval.html
* https://api.data.amsterdam.nl/webconnector/signals.html
* https://api.data.amsterdam.nl/webconnector/tellus.html

## Development

The web connectors consist of a HTML page and related JavaScript (JS) code.
The JavaScript code is transpiled from modern JS to very old JS so the Tableau desktop API can handle it using Webpack and Babel.

Install the requirements using: `npm install`.

Start the development server using: `npm start'.`

The web data connector are now be available on: `http://localhost:8080/afval.html` and so on.

## Simulator

To test the web connector you can use the Tableau web data connector simulator.
The simulator is installed and started with:

```bash
git clone https://github.com/tableau/webdataconnector.git
npm install --production
npm start
```

The simulator is available on: http://localhost:8888/Simulator/index.html

Point the simulator to your web connector, for example: http://localhost:8080/afval.html. 

The [docs](http://tableau.github.io/webdataconnector/docs/) are very useful.
Note that the simulator is quite different from the Tableau desktop app, most notably,
it can't handle large datasets (rendering is to slow) and many JS features don't work (e.g.: fetch).  

### Authentication / authorization

For authentication to work a redirect url needs to be added to the authz service in
the Openstack project located here.

`roles/authz/templates/authz.config.toml.j2`

examples:

```bash
http://localhost:8889/127.0.0.1:8089/webconnector/signals.html
http%3A%2F%2Flocalhost%3A8889%2F127.0.0.1%3A8089%2Fwebconnector%2Fsignals.html
https://acc.api.data.amsterdam.nl/webconnector/afval.html
```

update the acceptance auth service

```ansible-playbook deploy-authz.yml```

### Testing

Run test using:

```bash
npm test
``` 
