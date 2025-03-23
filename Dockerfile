FROM node:20.14-alpine AS builder

RUN apk add --no-cache bash git

WORKDIR /ask-me-anything

COPY . .

RUN npm install -g @microsoft/rush

RUN rush install \
  && rush build \
  && rush deploy --overwrite

FROM node:20.14-alpine AS runner

WORKDIR /ask-me-anything

COPY --from=builder /ask-me-anything/common/deploy .

WORKDIR /ask-me-anything/ask-me-anything-api

EXPOSE 3000

CMD ["npm", "run", "start:production"]