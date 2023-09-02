migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("meiby96hua0yzii")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f9ptitcv",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "f9ptitcv",
    "name": "user",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true,
      "maxSelect": 1,
      "displayFields": [
        "id"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
