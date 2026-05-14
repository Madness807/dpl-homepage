FROM ghcr.io/gethomepage/homepage:v0.10.9
ENV PORT=3001
COPY config/ /app/config/
EXPOSE 3001
