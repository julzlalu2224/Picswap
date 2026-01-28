# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

WORKDIR /src

# Copy project files
COPY Picswap.Client/Picswap.Client.csproj Picswap.Client/
RUN cd Picswap.Client && dotnet restore

# Copy everything else
COPY . .

# Build Tailwind CSS and publish app
WORKDIR /src/Picswap.Client
RUN npm install && \
    npm run build:css && \
    dotnet publish -c Release -o /app/publish

# Runtime stage - nginx to serve static files
FROM nginx:alpine

# Copy built files to nginx
COPY --from=build /app/publish/wwwroot /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
