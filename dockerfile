
FROM node:18-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

ARG REACT_APP_KAKAO_MAP_JS_KEY

ENV REACT_APP_KAKAO_MAP_JS_KEY ${REACT_APP_KAKAO_MAP_JS_KEY}

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=builder /app/build/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
