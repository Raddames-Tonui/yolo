# Week 5 IP 2 Creating a Basic Micro-service

# 1. Base Image Selection

The base image used to build the containers is `node:16-alpine3.16`. This image is based on Alpine Linux, a minimal and security-focused distribution, which makes it lightweight and efficient. It's specifically chosen for the following reasons:

- **Lightweight**: The Alpine Linux distribution is compact, reducing the overall image size.
- **Compatibility**: Node.js version 16 is used, which is stable and compatible with the dependencies and features required by the client and backend applications.
- **Security**: Alpine Linux has fewer security vulnerabilities due to its reduced attack surface.

### Base Images:

- **Client Base Image**: `node:16-alpine3.16`
- **Backend Base Image**: `node:16-alpine3.16`
- **MongoDB Base Image**: `mongo:6.0` (official MongoDB image)

---

# 2. Dockerfile Directives for Container Creation and Execution

## Client Dockerfile

The Client Dockerfile uses a multi-stage build process to reduce the final image size and improve efficiency.

### Build Stage:

1. `WORKDIR /client`: Set the working directory inside the container.
2. `COPY package*.json ./`: Copies the `package.json` and `package-lock.json` files.
3. `RUN npm install --only=production`: Installs only production dependencies and cleans up unnecessary files.
4. `COPY . .`: Copies the entire application code.
5. `RUN npm run build && npm prune --production`: Builds the production-ready app and removes development dependencies.

### Production Stage:

1. `COPY --from=build-stage /client/...`: Copies the necessary build artifacts (e.g., build, public, src directories).
2. `EXPOSE 3000`: Exposes port 3000 for the client application.
3. `CMD ["npm", "start"]`: Defines the command to run the client application.

## Backend Dockerfile

The Backend Dockerfile is similar but focuses on API creation.

### Steps:

1. **Install Dependencies**:

   - `WORKDIR /backend`: Set the working directory.
   - `COPY package*.json ./`: Copy the necessary package files.
   - `RUN npm install --only=production`: Installs production dependencies and cleans up cache and temporary files.

2. **Exposing Backend**:
   - `EXPOSE 5000`: Exposes port 5000 for the backend API.
   - `CMD ["npm", "start"]`: Starts the backend server when the container is run.

The Dockerfiles are optimized to ensure that only the necessary files are included in the final image, reducing the overall image size and ensuring a production-ready environment.

---

# 3. Docker Compose Networking

The `docker-compose.yaml` file configures the services with a custom bridge network (`yolo-network`) to ensure seamless communication between containers.

### Service Definitions:

1. **Client**:

   - `ports: "3000:3000"`: Maps port 3000 on the host to port 3000 in the container for the client application.
   - `networks: yolo-network`: Connects to the custom bridge network.

2. **Backend**:

   - `ports: "5000:5000"`: Maps port 5000 on the host to port 5000 in the container for the backend API.
   - `networks: yolo-network`: Also connects to the custom bridge network.

3. **MongoDB**:
   - `ports: "27017:27017"`: Maps the MongoDB default port (27017) to the host machine.
   - `networks: yolo-network`: Connects MongoDB to the same custom network.

### Network Setup:

- **Bridge Network (`yolo-network`)**: All services are connected to this network, allowing them to communicate internally. The custom bridge network ensures that each service can access the others without exposing unnecessary ports externally.

---

# 4. Docker Compose Volume Definition and Usage

The `docker-compose.yaml` file defines a volume for MongoDB to persist data across container restarts or deletions. The MongoDB data is stored in a named volume `mongodata`, which ensures that the data remains intact even when the container is stopped or removed.

```yaml
volumes:
  mongodata:
    driver: local
```

This volume is mapped to the MongoDB data directory within the container, ensuring persistent storage for the database even if the container is recreated.

---

# 5. Git Workflow to Achieve the Task

### Steps:

1. **Fork the Repository**:

   - Forked the repository from the original source.

2. **Clone the Repo**:

   ```
   git clone git@github.com:Maubinyaachi/yolo-Microservice.git
   ```

3. **Create `.gitignore`**:

   - Created a `.gitignore` file to exclude unnecessary files such as `node_modules` and logs from version control.

4. **Add Dockerfiles for Client and Backend**:

   ```
   git add client/Dockerfile
   git add backend/Dockerfile
   git commit -m "Added Dockerfiles"
   ```

5. **Add `docker-compose.yaml`**:

   ```
   git add docker-compose.yaml
   git commit -m "Added docker-compose file"
   ```

6. **Push Changes to GitHub**:

   ```
   git push
   ```

7. **Build the Docker Images**:

   ```
   docker compose build
   ```

8. **Push the Built Images to Docker Hub**:

   ```
   docker compose push
   ```

9. **Deploy the Containers using Docker Compose**:

   ```
   docker compose up
   ```

10. **Commit the Explanation**:
    - Created and committed the `explanation.md` file.

---

# 6. Successful Running of the Applications and Debugging Measures

The applications (client, backend, and MongoDB) were successfully deployed using Docker Compose. If issues arose during deployment, the following debugging steps were applied:

1. **Check Logs for Errors**:

   ```
   docker logs yolo
   ```

   Inspect individual container logs for issues.

2. **Use Docker Compose Logs**:

   ```
   docker-compose logs
   ```

   Inspect logs for all services in the Compose setup.

3. **Check Network Configuration**:
   - Ensured that all services were connected to the same network (`yolo-network`), enabling proper internal communication.

---

# 7. Good Practices for Docker Image Tagging and Versioning

To follow Docker best practices, image tags were used consistently to ensure clarity and ease of management:

1. **Tagging**: The images were tagged with version numbers, such as:

   - `myapp-client:v1.0`
   - `myapp-backend:v1.0`
   - `myapp-mongo:v1.0`

2. **Latest Tag**: The `latest` tag was applied to the most recent stable versions of the images to ensure clarity during deployment and to track version history efficiently.

---

# Screenshot of Deployed Image on DockerHub

![Docker Hub image](image.png)
