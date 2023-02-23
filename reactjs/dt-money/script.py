import json
import random

db = []

with open('db-static.json', 'r') as f:
  db = json.load(f)
  for transaction in db["transactions"]:
    transaction["amount"] = transaction["amount"] if random.uniform(0, 1) > 0.5 else -1 * transaction["amount"]

with open('db-static.json', 'w') as f:
  json.dump(db, f)