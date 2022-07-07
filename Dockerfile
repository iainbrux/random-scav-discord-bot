FROM node:16
COPY . .
RUN touch .env 
RUN cat .env.development >> .env
RUN yarn install
RUN yarn start