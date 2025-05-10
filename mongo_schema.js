db.createCollection("webhookRequests", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["requestId", "date", "headers", "body", "method", "path"],
        properties: {
          requestId: {
            bsonType: "string",
            description: "Request identifier"
          },
          date: {
            bsonType: "long",
            description: "Timestamp of the request"
          },
          headers: {
            bsonType: "object",
            description: "HTTP headers"
          },
          content_length: {
            bsonType: "int",
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