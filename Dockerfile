FROM node:10.16.0-alpine

ARG api_version

WORKDIR /app

RUN apk add bash

COPY package.json /app
COPY yarn.lock /app

RUN yarn install --production

COPY ./bin /app/bin
COPY ./build /app/build
COPY ./db /app/db
COPY ./wait-for-it.sh /app

CMD yarn start

EXPOSE 3000
