FROM node:22-alpine

WORKDIR /app

# Pre-install deps (will cache in Docker layer)
COPY package.json package-lock.json /app/
RUN npm install

# Copy all files
COPY /public /app
COPY /src /app
COPY index.html /app
COPY tsconfig.json /app
COPY vite.config.ts /app

# Expose the dev server port (Vite default)
EXPOSE 5173

# Start the dev server
CMD ["npm", "run", "dev"]