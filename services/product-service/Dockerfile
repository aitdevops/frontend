FROM ubuntu:20.04

# Set environment variables to avoid interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Update and install required packages
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy requirements.txt before other files to leverage Docker cache
COPY requirements.txt /app/requirements.txt

# Install dependencies
RUN pip3 install --no-cache-dir -r /app/requirements.txt

# Copy the application files
COPY . /app

# Expose the port the service will run on
EXPOSE 5001

# Set environment variables
ENV NAME ProductService

# Run the application
CMD ["python3", "app.py"]
