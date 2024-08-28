import { WorkerEntrypoint } from "cloudflare:workers";
import { connection } from "./database/client";

export class UserService extends WorkerEntrypoint<Env> {
  fetchUsers() {
    const db = connection(this.env.DATABASE_URL)
    return db.user.findMany();
  }

  async createUser(data: { name: string, email: string }) {
    const db = connection(this.env.DATABASE_URL)
    const user = await db.user.create({
      data,
    });

    return user;
  }
}

export default {
  // An error occurs when deploying this worker without register event handlers as default export.
  async fetch() {
    return new Response("Healthy!");
  },
};