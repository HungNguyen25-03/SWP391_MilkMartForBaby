# Example Dockerfile for backend-container using Node.js image
FROM node:20


# Set the working directory inside the container
WORKDIR /MilkShop/server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install


# Copy your application code into the container
COPY . .

# Expose any necessary ports
EXPOSE 4000

# Command to run your application or start the server
CMD ["node", "app.js"]
