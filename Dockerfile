# Step 1: Build Stage (using a smaller base image for the build process)
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (production dependencies)
RUN npm install 

# Copy the rest of the application files
COPY . .

# Build the project
RUN npm run build

# Step 2: Production Stage (using a smaller base image for production)
FROM nginx:alpine

# Copy the build output from the build stage to nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the web server
EXPOSE 3000

# Start nginx in the background
CMD ["nginx", "-g", "daemon off;"]
