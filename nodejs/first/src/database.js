import fs from "node:fs/promises";

const dbPath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(dbPath, "utf8")
      .then((data) => (this.#database = JSON.parse(data)))
      .catch(() => this.#persist());
  }

  #persist() {
    fs.writeFile(dbPath, JSON.stringify(this.#database));
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      const where = {
        name: search.toLowerCase(),
        email: search.toLowerCase(),
      };

      data = data.filter(
        (row) =>
          row.name.toLowerCase().includes(where.name) ||
          row.email.toLowerCase().includes(where.email)
      );
    }

    return data;
  }

  insert(table, data) {
    if (this.#database[table]) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (Boolean(~rowIndex)) {
      this.#database[table][rowIndex] = { id, ...data };
      this.#persist();
    }

    return id;
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id);

    if (Boolean(~rowIndex)) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }

    return id;
  }
}
