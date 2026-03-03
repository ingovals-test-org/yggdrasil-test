FROM nginx:alpine
WORKDIR /usr/share/nginx/html

ARG APP_VERSION=unknown
ENV APP_VERSION=${APP_VERSION}

# Copy static storybook build output
COPY storybook-static ./

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
