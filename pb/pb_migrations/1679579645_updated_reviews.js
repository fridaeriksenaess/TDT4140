migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("meiby96hua0yzii")

  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("meiby96hua0yzii")

  collection.deleteRule = null

  return dao.saveCollection(collection)
})
