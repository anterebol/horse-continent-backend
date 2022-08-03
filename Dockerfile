FROM node:16.15.1-alpine

WORKDIR /backend

COPY package.json /backend

RUN npm install

COPY . .

EXPOSE ${PORT}
# "start": "NODE_TLS_REJECT_UNAUTHORIZED='0' nest start"