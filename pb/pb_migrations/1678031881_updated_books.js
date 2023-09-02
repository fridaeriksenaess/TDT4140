migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hisltzb0tfbco17")

  // remove
  collection.schema.removeField("lp5qnhhf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gng2qiql",
    "name": "dexcription",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hisltzb0tfbco17")

  // add
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

  // remove
  collection.schema.removeField("gng2qiql")

  return dao.saveCollection(collection)
})
