migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("meiby96hua0yzii")

  // remove
  collection.schema.removeField("ljknkzgd")

  // remove
  collection.schema.removeField("0m3cn9xs")

  // remove
  collection.schema.removeField("jhpofr1c")

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("meiby96hua0yzii")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ljknkzgd",
    "name": "user",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0m3cn9xs",
    "name": "book",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jhpofr1c",
    "name": "writer",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("f9ptitcv")

  return dao.saveCollection(collection)
})
