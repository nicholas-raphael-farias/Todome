FROM node:22-alpine
WORKDIR /app

# Pre-install deps (will cache in Docker layer)
COPY package.json package-lock.json /app/
RUN npm install

# Copy all files
COPY . /app

EXPOSE 3000

CMD ["npx", "json-server", "db.json"]