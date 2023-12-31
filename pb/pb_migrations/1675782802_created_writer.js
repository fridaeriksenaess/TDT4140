migrate((db) => {
  const collection = new Collection({
    "id": "6wh4qblcqvcbbbj",
    "created": "2023-02-07 15:13:22.893Z",
    "updated": "2023-02-07 15:13:22.893Z",
    "name": "writer",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "sjhumca8",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6wh4qblcqvcbbbj");

  return dao.deleteCollection(collection);
})
