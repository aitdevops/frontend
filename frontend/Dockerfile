# Use an official Ubuntu image as a base
FROM ubuntu:latest

# Install Nginx
RUN apt-get update && apt-get install -y nginx

# Remove the default Nginx website
RUN rm -rf /var/www/html/*

# Copy the current directory contents into the container at /var/www/html
COPY . /var/www/html

# Expose port 80 to the outside world
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]