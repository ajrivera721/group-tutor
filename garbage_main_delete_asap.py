import json
import csv

class QueueItem:
    course, topic, location, description, timestamp, status, tutor = [None] * 7
    students = []

    def __init__(course, topic, location, description, timestamp, status, tutor, student):
        self.course = course
        self.topic = topic
        self.location = location
        self.description = description
        self.timestamp = timestamp
        self.status = status
        self.tutor = tu tor
        students.append(student)

    def info(self):
        return [self.course, self.topic, self.location, self.description, self.timestamp, self.status, self.tutor, self.students]

def parse_json(data, context):
    """Background Cloud Function.
            Args:
            event (dict): The dictionary with data specific to the given event.
            context (google.cloud.functions.Context): The Cloud Functions event
            metadata.
            """


    file = data['name']
    with open(file, 'r') as f:
        jsonInfo = json.load(f);
        #jsonFile can now be accessed like "jsonInfo['std_name']" or "jsonInfo['topic']" would return your values

    with open('queues.csv', mode='r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        titleRow = next(csv_reader)
        queue = []
        for row in csv_reader:
            queue.append(QueueItem(row["course"], row["topic"], row["location"], row["description"], row["timestamp"], row["status"], row["tutor"], row["students"]))

    print("ok ur turn patrick")

    with open('queues.csv', mode='w') as csv_output:
        csv_writer = csv.writer(csv_output, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        
        csv_writer.writerow(titleRow)
        for item in queue:
            csv_writer.writerow(item.info())
            

