FROM node:alpine
COPY package.json /app/
RUN cd /app && \
    npm install --quiet --production
WORKDIR /app
EXPOSE ${PORT}
CMD npm run test || exit 1
