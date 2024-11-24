# Calo Task

This test application was developed for the task provided by Calo. The app allows users to create jobs with a simple button click. Multiple jobs can be executed in parallel, each taking a random amount of time to complete. Upon completion, the job data is sent to the client in real-time using Socket.io.

The application is built using **React.js** for the frontend and **Node.js/Express.js** for the backend.

---

## Technologies Used

### Frontend:
- **React.js**: For building the user interface.
- **Tailwind CSS**: Utilizing a utility-first CSS framework for styling.
- **Socket.io**: For real-time communication between the frontend and backend.

### Backend:
- **Express.js**: A web framework for building the API.
- **Node.js**: JavaScript runtime used for the backend.
- **BullMQ**: A library for managing background jobs and task queues.
- **Redis**: In-memory data structure store used for caching and job queue management.
- **Socket.io**: For real-time communication between the server and client.

### Deployment:
- **EC2**: The application is deployed on an AWS EC2 instance, which also hosts the Redis server for caching job data.

---

## Features

- **Real-Time Job Management**: Users can create multiple jobs, and each job's status is updated in real-time on the frontend.
- **Job Creation and Details**: Users can create new jobs, view job details, and track their status.
- **Handling Slow/No Internet**: The front end is built to gracefully handle slow or no internet connections, ensuring a smooth user experience. However, this functionality is primarily supported on Chrome and may not be available on all browsers.
- **Parallel Job Execution**: The backend processes jobs in parallel, with job completion times being random.

---

## Application Overview

### Frontend:
The frontend is a **two-page application** with the following features:
- Displays a list of all jobs.
- Allows users to create new jobs.
- Provides detailed information about each job.
- All updates are real-time, using WebSocket communication to push updates to the frontend.

**Development Time**: Approximately 4 hours spent on UI development, debugging, and ensuring real-time functionality.

### Backend:
The backend consists of two main components: the **Server** and the **Queue Worker**.

- **Server**:
  - Creates and pushes jobs to the queue for completion.
  - Fetches all jobs and individual job details.
  - Handles incoming requests for job status and updates.
  
  **Development Time**: Approximately 2 hours to set up the server and API routes.

- **Queue Worker**:
  - Processes jobs one by one from the queue.
  - Updates a `data.json` file with the job data.
  - Jobs are cached in Redis to prevent data loss. In case of server restarts, the worker will continue processing the jobs.
  - Sends updated job status to the frontend via socket events.

  **Development Time**: Approximately 5 hours for implementing job processing, Redis caching, and real-time updates.

### Testing:
**Testing & Debugging Time**: Approximately 4 hours spent on complete app testing and debugging.

### Deployment:
- Both the frontend (client) and backend (server) are deployed on **AWS EC2**.
- Redis is also hosted on the same EC2 instance for caching job data.

**Deployment Time**: 3 hours for setting up the EC2 instance, deploying the client and server, and configuring Redis. (Various deployment options were tested before finalizing the solution to support sockets.)

---

## Deployed Links
- **Client (Frontend)**: [http://3.106.127.210:3000/](http://3.106.127.210:3000/)
- **Server (Backend)**: [http://3.106.127.210:4000/](http://3.106.127.210:4000/)
- **Working Demo (Loom Video)**: [Link to Loom Video](#)

---

## Running Locally

To run this application locally, follow the steps below:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/abdulhaseeb2115/Calo-Task.git
   ```

2. **Client Setup**:
   - Navigate to the client directory:
     ```bash
     cd client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

3. **Server Setup**:
   - Navigate to the server directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - **Redis Setup**:
     - Run Redis locally or use Docker to run Redis.
     - Alternatively, provide cloud Redis credentials in the `.env` file.
   - Start the server:
     ```bash
     npm run start
     ```

4. **Configuration Files**:
   - `.env.example` files are provided in both the **client** and **server** directories. Rename them to `.env` and add your configuration settings.
