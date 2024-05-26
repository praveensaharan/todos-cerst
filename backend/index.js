const path = require("path");
const fastify = require("fastify")();
const cors = require("@fastify/cors");
const Redis = require("ioredis");
require("dotenv").config();

// Create a Redis connection
const connection = new Redis(process.env.REDIS_URL);

// Check Redis connection
connection.on("connect", () => {
  console.log("Connected to Redis successfully.");
});

connection.on("error", (err) => {
  console.error("Redis connection error:", err);
});

fastify.register(cors);

// Route to get all tasks for a user
fastify.get("/user/:userId/todos", async (request, reply) => {
  try {
    const { userId } = request.params;

    const taskIds = await connection.lrange(`taskIds:${userId}`, 0, -1);
    const tasks = await Promise.all(
      taskIds.map((id) => connection.hget(`tasks:${userId}`, id))
    );
    reply.code(200).send(tasks.map(JSON.parse));
  } catch (err) {
    console.error("Error getting tasks:", err);
    reply.code(500).send({ error: "Error getting tasks" });
  }
});

// Route to get a single task by ID for a user
fastify.get("/user/:userId/todos/:id", async (request, reply) => {
  try {
    const { userId, id } = request.params;
    const task = await connection.hget(`tasks:${userId}`, id);
    if (task) {
      reply.code(200).send(JSON.parse(task));
    } else {
      reply.code(404).send({ error: "Task not found" });
    }
  } catch (err) {
    console.error("Error getting task:", err);
    reply.code(500).send({ error: "Error getting task" });
  }
});

// Route to create a new task for a user
fastify.post("/user/:userId/todo", async (request, reply) => {
  try {
    const { userId } = request.params;
    const newTask = request.body;
    const taskId = await connection.incr(`taskId:${userId}`);
    newTask.id = taskId;
    await connection.hset(`tasks:${userId}`, taskId, JSON.stringify(newTask));
    await connection.rpush(`taskIds:${userId}`, taskId.toString());
    reply.code(201).send(newTask);
  } catch (err) {
    console.error("Error creating task:", err);
    reply.code(500).send({ error: "Error creating task" });
  }
});

// Route to update an existing task by ID for a user
fastify.put("/user/:userId/todos/:id", async (request, reply) => {
  try {
    const { userId, id } = request.params;
    const updatedTask = request.body;
    updatedTask.id = id;
    await connection.hset(`tasks:${userId}`, id, JSON.stringify(updatedTask));
    reply.code(200).send(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    reply.code(500).send({ error: "Error updating task" });
  }
});

// Route to delete a task by ID for a user
fastify.delete("/user/:userId/todos/:id", async (request, reply) => {
  try {
    const { userId, id } = request.params;
    await connection.hdel(`tasks:${userId}`, id);
    await connection.lrem(`taskIds:${userId}`, 0, id);
    reply.code(204).send();
  } catch (err) {
    console.error("Error deleting task:", err);
    reply.code(500).send({ error: "Error deleting task" });
  }
});

// Start the server
const port = process.env.PORT || 3000;
fastify.listen(port, "0.0.0.0", (err) => {
  if (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
  console.log(`Server is running on http://localhost:${port}`);
});
