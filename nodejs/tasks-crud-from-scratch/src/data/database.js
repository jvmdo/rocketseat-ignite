import fs from "node:fs";
import { randomUUID } from "node:crypto";
import { parse } from "csv-parse";

export class Database {
  #readFile;
  #writeFile;

  constructor(dbPath) {
    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, "", "utf8");
      console.log(`Database created at ${dbPath}`);
    }

    this.#readFile = fs.createReadStream(dbPath, { encoding: "utf8" });
    this.#writeFile = fs.createWriteStream(dbPath, {
      encoding: "utf8",
      flags: "a+",
    });
  }

  destructor() {
    this.#readFile.destroy();
    this.#writeFile.destroy();
  }

  async initializer(tasksPath) {
    try {
      const parser = fs
        .createReadStream(tasksPath)
        .pipe(parse({ encoding: "utf8", bom: true, columns: true }));

      for await (const task of parser) {
        this.create(task);
      }
    } catch (err) {
      throw err;
    }

    console.log(`Database populated with ${tasksPath} data`);
  }

  create(task) {
    if (!task || typeof task !== "object" || Array.isArray(task)) {
      throw new TypeError("Expected [task] to be an actual object");
    }

    const { title, description } = task;

    if (title === undefined || description === undefined) {
      throw new TypeError("Missing either [title] or [description] properties");
    }

    const newTask = {
      id: randomUUID(),
      title,
      description,
      completedAt: null,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    return new Promise((resolve, reject) => {
      const record = `${JSON.stringify(newTask)}\n`;

      this.#writeFile.write(record, (err) => {
        return err ? reject(err) : resolve(record);
      });
    });
  }
}
