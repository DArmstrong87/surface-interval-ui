# Stage 1: Build the frontend
FROM node:18 AS builder

WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy the full source and build
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Clean default Nginx HTML
RUN rm -rf /usr/share/nginx/html/*

# Copy built site to Nginx public folder
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom Nginx config listening on 8080
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose default port and run Nginx
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
