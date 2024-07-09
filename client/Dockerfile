# Use Node.js v20 alpine image as base
FROM node:20-alpine3.20

# Set the working directory inside the container
WORKDIR /Milkshop/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]