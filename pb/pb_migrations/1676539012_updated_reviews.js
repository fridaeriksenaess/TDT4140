migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("meiby96hua0yzii")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pgjfw7c8",
    "name": "review",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": 500,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("meiby96hua0yzii")

  // remove
  collection.schema.removeField("pgjfw7c8")

  return dao.saveCollection(collection)
})
