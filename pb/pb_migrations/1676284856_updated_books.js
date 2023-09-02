migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hisltzb0tfbco17")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ihlzlda7",
    "name": "tags",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 4,
      "values": [
        "Tag1",
        "Tag2",
        "Tag3",
        "Tag4"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hisltzb0tfbco17")

  // remove
  collection.schema.removeField("ihlzlda7")

  return dao.saveCollection(collection)
})
