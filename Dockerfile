# Use official Node.js image as the base image
FROM node:18-alpine AS builder

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN yarn build

# Production Stage
FROM node:18-alpine AS runner

WORKDIR /app

# Copy built application from builder stage
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose the port the app runs on
EXPOSE 3000

# Run the Next.js application
CMD ["yarn", "start"]
