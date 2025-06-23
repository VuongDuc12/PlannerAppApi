# ------------------------
# Stage 1: Build React App
# ------------------------
    FROM node:18 AS build
    WORKDIR /app
    COPY . .
    
    RUN npm install
    RUN npm run build
    
    # ------------------------
    # Stage 2: Serve with Nginx
    # ------------------------
    FROM nginx:alpine
    COPY --from=build /app/dist /usr/share/nginx/html
    
    # Optional: Replace default nginx config (if needed)
    # COPY nginx.conf /etc/nginx/nginx.conf
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    