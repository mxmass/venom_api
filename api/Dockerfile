FROM node:latest
COPY package.json /app/
RUN cd /app && \
    npm install && \
    npm install -g nodemon
WORKDIR /app
COPY . .
CMD npm run development
