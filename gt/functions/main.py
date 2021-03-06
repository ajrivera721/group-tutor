import pandas as pd
import json

def parse_json(data, context):
    try:
        q = pd.read_csv("queues.csv", names=["course","names","topic","tag", "location","descriptions"])
    except:
        q = pd.DataFrame({"course":j["course"],"names":[j["name"]],"topic":j["topic"],"tag":j["tag"], "location":j["location"],"descriptions":[j["description"]]})
        q.to_csv("queues.csv", index=False, header=False)
        return
    with open(data['name'], 'r') as f:
        j = json.load(f)
    for index,ticket in q.iterrows():
        if j["topic"] == ticket["topic"] and j["tag"] == ticket["tag"] and len(ticket["names"]) < MAX_GROUP_SIZE:
            q.loc[index, "names"].append(j["name"])
            q.loc[index, "descriptions"].append(j["description"])
            q.to_csv("queues.csv", index=False, header=False)
            return
        q = q.append({"course":j["course"],"names":[j["name"]],"topic":j["topic"],"tag":j["tag"], "location":j["location"],"descriptions":[j["description"]]}, ignore_index=True)
        q.to_csv("queues.csv", index=False, header=False)
