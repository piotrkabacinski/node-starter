import { Job, Queue, Worker } from "bullmq";
import { connection } from "./connection.js";
import { sleep } from "src/utils/sleep.js";

export const tasksQueueName = "tasks";

export const tasksQueue = new Queue(tasksQueueName, { connection });

export const tasksWorker = new Worker(
  tasksQueueName,
  async (job: Job) => {
    switch (job.name) {
      case "test":
        // Pretend some magic is happening...
        await sleep(2000);
        break;
    }
  },
  {
    connection,
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 50 },
  },
);

tasksWorker.on("completed", (job) => {
  console.log({
    id: job.id,
    data: job.data,
    name: job.name,
    status: "completed",
  });
});

tasksWorker.on("failed", (job, err) => {
  console.error(job.name, err);
});
