# Use an official Node.js runtime as a parent image
FROM node:20.3.1

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
ENV NAME nextjs

# Run your Next.js app
CMD ["npm", "run", "dev"]
