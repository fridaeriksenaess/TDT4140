migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hisltzb0tfbco17")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lp5qnhhf",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 2,
      "max": 1000,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hisltzb0tfbco17")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lp5qnhhf",
    "name": "description",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": 2,
      "max": 500,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
