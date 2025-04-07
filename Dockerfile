# Stage 1: Build the Angular app using Nx
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy all files into the container
COPY . .

# Install dependencies using Yarn with frozen lockfile
RUN yarn install --frozen-lockfile

# Build the Angular application using Nx in production mode
RUN yarn nx build stepper-app --configuration=production

# Stage 2: Use NGINX to serve the built application
FROM nginx:alpine

# Copy the compiled Angular app from the builder stage
COPY --from=builder /app/dist/apps/stepper-app/browser /usr/share/nginx/html

# Replace the default NGINX configuration with a custom one
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for HTTP
EXPOSE 80

# Start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
