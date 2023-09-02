migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m2whrsoi",
    "name": "readList",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "hisltzb0tfbco17",
      "cascadeDelete": false,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("_pb_users_auth_")

  // remove
  collection.schema.removeField("m2whrsoi")

  return dao.saveCollection(collection)
})
