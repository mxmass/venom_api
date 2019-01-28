FROM node:latest
COPY package.json /app/
COPY .env.prod /app/.env
RUN cd /app && \
    npm install && \
    npm install -g nodemon
WORKDIR /app
COPY . .
CMD npm run development
