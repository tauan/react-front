FROM node:lts 
MAINTAINER Tauan Gabriel
COPY . /var/www
WORKDIR /var/www
RUN npm install
RUN npx next build
ENTRYPOINT npx next start
expose 3000