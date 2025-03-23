FROM node:20.14-alpine AS builder

RUN apk add --no-cache bash git

WORKDIR /ask-me-anything

COPY . .

RUN npm install -g @microsoft/rush

RUN rush install \
  && rush build \
  && rush deploy --overwrite

FROM node:20.14-alpine AS runner

WORKDIR /ask-me-anything-api/

COPY --from=builder /ask-me-anything/common/deploy/ask-me-anything-api .
COPY --from=builder /ask-me-anything/common/deploy/ask-me-anything-api/node_modules /ask-me-anything-api/node_modules

EXPOSE 3000

CMD ["npm", "run", "start:production"]