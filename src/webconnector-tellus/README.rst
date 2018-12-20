
Webconnector code.
==================

A quick overview


shared:

        auth.js - Does the oauth2 dance to get a access token

webconnectors:

        afval.js - garbadge containers (no auth needed).

        signals.js - download signals data. (needs AUTH).


You can download / git checkout the webconnector simulator


        http://tableau.github.io/webdataconnector/docs/

        git clone https://github.com/tableau/webdataconnector.git

        npm install --production

        npm start

Now you will have a simulator running on:

        http://localhost:8888/Simulator/index.html


Test  web connectors in the simulator
===================

run the datapunt catalog docker, volume mount the source code for easy editing and testing.


In the simulator load the following urls. npm start will also run a proxy
server taking care of cors headers.


        http://localhost:8889/127.0.0.1:8089/webconnector/signals.html
        http://localhost:8889/127.0.0.1:8089/webconnector/afval.html


for auth to work a redirect url needs to be added to the authz service in
the Openstack project located here.

roles/authz/templates/authz.config.toml.j2

examples:

    http://localhost:8889/127.0.0.1:8089/webconnector/signals.html
    http%3A%2F%2Flocalhost%3A8889%2F127.0.0.1%3A8089%2Fwebconnector%2Fsignals.html
    https://acc.api.data.amsterdam.nl/webconnector/afval.html


update the acceptance auth service

        ansible-playbook deploy-authz.yml


