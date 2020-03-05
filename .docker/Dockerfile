FROM node:12-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .
## RUN yarn test
#RUN yarn build
#
##dev
#FROM node:12-alpine AS dev
#WORKDIR /app
#COPY --from=build /app/dist ./dist
#COPY --from=build /app/package.json .
#COPY --from=build /app/yarn.lock .
#COPY --from=build /app/.* ./
#COPY --from=build /app/*.json ./
#COPY --from=build /app/*.js ./
#COPY --from=build /app/node_modules ./node_modules


## prod
#RUN yarn install --prod
#
#FROM mhart/alpine-node:slim-12
#RUN mkdir ./app
#WORKDIR /app
#COPY --from=build /app/dist ./dist
#COPY --from=dev /app/node_modules ./node_modules
#COPY --from=dev /app/package.json ./
#COPY --from=build /app/.* ./
RUN ls -la

EXPOSE 8080
CMD [ "node", "." ]
