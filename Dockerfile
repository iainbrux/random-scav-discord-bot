FROM node:16
COPY ./src src
RUN yarn install
RUN yarn start