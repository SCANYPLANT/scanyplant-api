FROM node:12-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY .docker .

RUN ls -la

EXPOSE 8080
CMD [ "ts-node", "." ]
