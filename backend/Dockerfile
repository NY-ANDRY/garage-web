# PHP 8.2 with Node.js environment for Laravel
FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk update && apk add --no-cache \
    libpng-dev \
    libpq-dev \
    libzip-dev \
    icu-dev \
    oniguruma-dev \
    git \
    curl \
    netcat-openbsd \
    nodejs \
    npm

# Install PHP extensions
RUN docker-php-ext-install -j$(nproc) \
    pdo \
    pdo_pgsql \
    gd \
    bcmath \
    intl \
    zip \
    opcache

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configure PHP
RUN echo "memory_limit = 512M" >> /usr/local/etc/php/conf.d/docker.ini && \
    echo "upload_max_filesize = 100M" >> /usr/local/etc/php/conf.d/docker.ini && \
    echo "post_max_size = 100M" >> /usr/local/etc/php/conf.d/docker.ini

WORKDIR /app

# No COPY, ENTRYPOINT or CMD here. Managed by docker-compose.
EXPOSE 80 9000
