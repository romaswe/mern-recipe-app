#  Dockerfile for Node Express Backend api (development)

FROM node:14.15.3-alpine3.12

ARG NODE_ENV=development

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /app

# Install Dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD ["npm","start"]