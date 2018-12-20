# Build
FROM node:10.14.2 AS build-deps
MAINTAINER datapunt.ois@amsterdam.nl

COPY src/webconnector/js /build

WORKDIR /build/

RUN npm install -D -g webpack webpack-cli
RUN npm install -D babel-loader @babel/polyfill @babel/core @babel/preset-env

RUN webpack

# webserver image.
FROM nginx:1.15.7
MAINTAINER datapunt.ois@amsterdam.nl

ENV BASE_URL=https://api.data.amsterdam.nl/
COPY cmd.sh /usr/local/bin/
RUN chmod 755 /usr/local/bin/cmd.sh

COPY src/ /usr/share/nginx/html/
COPY --from=build-deps /build/dist/ /usr/share/nginx/html/webconnector/js/dist/
CMD cmd.sh
