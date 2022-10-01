# build environment
FROM node:lts-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
# Nginx config
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Static build
COPY --from=build /app/build /usr/share/nginx/html
# Default port exposure
EXPOSE 80
# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .
# Add bash and Make our shell script executable
RUN apk add --no-cache bash && chmod +x env.sh
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]