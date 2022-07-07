FROM node:16
RUN npm install -g yarn
RUN yarn install
RUN yarn start