FROM alpine

MAINTAINER Robert Tezli (robert@pixills.com)

WORKDIR /var/www

EXPOSE 80 443

COPY ./ /var/www

RUN apk add --no-cache nodejs python make g++ &&\
    touch .env &&\
    npm install &&\
    apk del python make g++ &&\
    rm -rf /var/cache/* &&\
    rm -rf /var/cache/*

ENTRYPOINT ["npm", "start"]
