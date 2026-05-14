FROM ghcr.io/gethomepage/homepage:v0.10.9
ENV PORT=3000 \
    HOMEPAGE_PROXY_PORT=3001 \
    HOMEPAGE_ALLOWED_HOSTS=*
COPY config/ /app/config/
COPY start.js /app/start.js
EXPOSE 3001
CMD ["node", "/app/start.js"]
