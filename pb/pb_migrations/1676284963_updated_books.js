migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hisltzb0tfbco17")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ihlzlda7",
    "name": "tags",
    "type": "select",
    "required": false,
    "unique": false,
    "options": {
      "maxSelect": 5,
      "values": [
        "Fantasy",
        "History",
        "Romance",
        "Inspirational",
        "Kids",
        "Crime",
        "Novel",
        "ClassicC"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hisltzb0tfbco17")

  // update
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
})
