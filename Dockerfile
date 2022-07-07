FROM node:16
COPY . .
RUN touch .env 
RUN echo "${{secrets.DISCORD_BOT_TOKEN }}" > .env
RUN yarn install
RUN yarn start