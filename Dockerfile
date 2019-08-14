# Build
FROM node:10.15.0 AS build-deps
LABEL MAINTAINER="datapunt.ois@amsterdam.nl"

COPY src/webconnector/package*.json /build/webconnector/
WORKDIR /build/webconnector
RUN npm install && npm cache clean --force
COPY src /build
RUN npm run build

COPY /deploy /deploy


# webserver image.
FROM nginx:1.15.7
LABEL MAINTAINER="datapunt.ois@amsterdam.nl"

ENV BASE_URL=https://api.data.amsterdam.nl/
COPY cmd.sh /usr/local/bin/
RUN chmod 755 /usr/local/bin/cmd.sh

COPY static/ /usr/share/nginx/html/
COPY --from=build-deps /build/webconnector/dist/ /usr/share/nginx/html/webconnector/
CMD cmd.sh
