# Use an official Nginx image as a base
FROM nginx:latest

# Remove the default Nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the current directory contents into the container at /usr/share/nginx/html
COPY . /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
