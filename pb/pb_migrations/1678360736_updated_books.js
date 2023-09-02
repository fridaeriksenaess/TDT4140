migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hisltzb0tfbco17")

  // remove
  collection.schema.removeField("oayhdl2e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x1nwqs3u",
    "name": "vurd",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "meiby96hua0yzii",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": [
        "id",
        "rating"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hisltzb0tfbco17")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oayhdl2e",
    "name": "vurd",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "meiby96hua0yzii",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": [
        "rating",
        "id"
      ]
    }
  }))

  // remove
  collection.schema.removeField("x1nwqs3u")

  return dao.saveCollection(collection)
})
