migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("meiby96hua0yzii")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dfxnzkhf",
    "name": "book",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "hisltzb0tfbco17",
      "cascadeDelete": true,
      "maxSelect": 1,
      "displayFields": [
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("meiby96hua0yzii")

  // remove
  collection.schema.removeField("dfxnzkhf")

  return dao.saveCollection(collection)
})
