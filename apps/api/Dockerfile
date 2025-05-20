FROM node:23

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (to optimize caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Install some other things needed for Husky to work (git)
RUN apt-get update && apt-get install -y git && npm install

# Copy the rest of the project files
COPY . .

# Expose the application's port
EXPOSE 3001

# Command to run the built application
CMD ["node", "index.ts"]
