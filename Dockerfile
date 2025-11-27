FROM node:14.16.1-alpine3.10 AS base
WORKDIR /var/www/

# -----------------------------------------------------------
# CONTACT SERVICE
# -----------------------------------------------------------
FROM base AS contact-service

COPY services/contact/package*.json ./
RUN npm install --only=production

COPY services/contact/ .
CMD ["node", "app.js"]

# -----------------------------------------------------------
# ORDER SERVICE
# -----------------------------------------------------------
FROM base AS order-service

COPY services/order/package*.json ./
RUN npm install --only=production

COPY services/order/ .
CMD ["node", "app.js"]

# -----------------------------------------------------------
# SHIPPING SERVICE
# -----------------------------------------------------------
FROM base AS shipping-service

COPY services/shipping/package*.json ./
RUN npm install --only=production

COPY services/shipping/ .
CMD ["node", "app.js"]

# -----------------------------------------------------------
# REPORT SERVICE (o novo 💡)
# -----------------------------------------------------------
FROM base AS report-service

COPY services/report/package*.json ./
RUN npm install --only=production

COPY services/report/ .
CMD ["node", "app.js"]
