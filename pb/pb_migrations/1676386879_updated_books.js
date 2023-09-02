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
        "Classic",
        "Bestseller",
        "Thriller",
        "Autobiography",
        "Science fiction",
        "Comedy",
        "Educational",
        "Theory",
        "Business",
        "Economics",
        "Finance",
        "Science",
        "Astronomy",
        "Technology"
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
      "maxSelect": 5,
      "values": [
        "Fantasy",
        "History",
        "Romance",
        "Inspirational",
        "Kids",
        "Crime",
        "Novel",
        "Classic",
        "Bestseller",
        "Thriller",
        "Autobiography",
        "Science fiction",
        "Comedy"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
