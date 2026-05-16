FROM node:20-alpine

WORKDIR /app

ARG NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3001/graphql
ARG NEXT_PUBLIC_GRAPHQL_WS_URL=ws://localhost:3001/graphql

ENV NEXT_PUBLIC_GRAPHQL_URL=$NEXT_PUBLIC_GRAPHQL_URL
ENV NEXT_PUBLIC_GRAPHQL_WS_URL=$NEXT_PUBLIC_GRAPHQL_WS_URL

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npx", "next", "start", "-H", "0.0.0.0"]
