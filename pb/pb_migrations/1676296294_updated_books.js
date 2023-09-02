migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hisltzb0tfbco17")

  // remove
  collection.schema.removeField("peobhswc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "riamknfs",
    "name": "rating",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 10
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hisltzb0tfbco17")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "peobhswc",
    "name": "rating",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("riamknfs")

  return dao.saveCollection(collection)
})
