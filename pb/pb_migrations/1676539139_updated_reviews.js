migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("meiby96hua0yzii")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jhpofr1c",
    "name": "writer",
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("meiby96hua0yzii")

  // remove
  collection.schema.removeField("jhpofr1c")

  return dao.saveCollection(collection)
})
