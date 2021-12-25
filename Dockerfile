FROM node:14.18.2
WORKDIR /app
COPY package.json .
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "production" ] ; \
    then npm install --only=production ; \
    else npm install ; \
    fi
COPY . .
ENV PORT 3333
EXPOSE $PORT
CMD ["npm", "run","dev"]