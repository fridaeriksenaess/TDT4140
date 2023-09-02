migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6wh4qblcqvcbbbj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sjhumca8",
    "name": "name",
    "type": "text",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6wh4qblcqvcbbbj")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
