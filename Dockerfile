#Primera Etapa
FROM node:18.4.0 as imgfront

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

FROM node:18.4.0 as imgback

RUN json-server --watch heroes.json

FROM nginx:1.17.1-alpine
	
COPY --from=imgfront /app/dist/w2w-heroes /usr/share/nginx/html

