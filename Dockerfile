# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory in the Docker container
WORKDIR /usr/src

# Copy the package files separately for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Install serve globally
RUN npm install -g serve

EXPOSE 8888

CMD ["serve", "-s", "dist", "-l", "8888"]
