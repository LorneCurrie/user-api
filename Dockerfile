FROM node:10.16.0-alpine

ARG api_version

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
COPY ./bin /app/bin

RUN yarn install

ENV IAPI_VERSION=$iapi_version

COPY ./build/ /app

EXPOSE 80 443

CMD yarn start
