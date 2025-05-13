db.createCollection("webhookRequests", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["date", "headers", "body", "method", "path"],
      properties: {
        date: {
          bsonType: ["long", "date"],
          description: "Timestamp of the request"
        },
        headers: {
          bsonType: "object",
          description: "HTTP headers"
        },
        content_length: {
          bsonType: ["int", "long"],
          description: "Length of the content"
        },
        body: {
          bsonType: "string",
          description: "Request body"
        },
        method: {
          bsonType: "string",
          description: "HTTP method used"
        },
        path: {
          bsonType: "string",
          description: "Request path"
        },
        query: {
          bsonType: "string",
          description: "Query parameters"
        }
      }
    }
  }
});