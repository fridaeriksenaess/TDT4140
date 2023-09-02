migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hisltzb0tfbco17")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fi2azof8",
    "name": "writer",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "6wh4qblcqvcbbbj",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": [
        "id",
        "name"
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
    "id": "fi2azof8",
    "name": "writer",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "6wh4qblcqvcbbbj",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": [
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
