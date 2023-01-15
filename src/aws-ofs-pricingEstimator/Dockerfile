FROM python:3.9-slim-buster

# Set working directory
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy the rest of the application code
COPY . .

# Run the command to start uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "80"]
