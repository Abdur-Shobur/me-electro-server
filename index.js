const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const color = require('colors')
const port = process.env.PORT || 5000
const app = express()
// module
app.use(cors())
app.use(express.json())

// assignment11
// KIT3UhSh9Lsk8psn
const uri =
  'mongodb+srv://assignment11:KIT3UhSh9Lsk8psn@cluster0.uqjddlf.mongodb.net/?retryWrites=true&w=majority'

// const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

app.get('/', (req, res) => {
  res.send('<h1>Server is Running</h1>')
})

const run = async () => {
  const db = client.db('assignment11')
  const coll = db.collection('services')
  const revColl = db.collection('review')
  try {
    // get req
    app.get('/services', async (req, res) => {
      const limit = parseInt(req.query.limit)
      const query = {}
      const cursor = coll.find(query)
      const result = await cursor.limit(limit).toArray()
      res.send(result)
    })

    // get single services
    app.get('/services/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const cursor = coll.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })

    // add services
    app.post('/services', async (req, res) => {
      const service = req.body
      const result = await coll.insertOne(service)
      res.send(result)
      console.log(req.body, result)
    })

    // delete services
    app.delete('/services/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      // const cursor = coll.find(query)
      const result = await coll.deleteOne(query)
      res.send(result)
    })

    // add review
    app.post('/review', async (req, res) => {
      const review = req.body
      const result = await revColl.insertOne(review)
      res.send(result)
    })
    // add review
    app.get('/review', async (req, res) => {
      const query = {}
      const cursor = revColl.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })

    // get single reviews by review id
    app.get('/review/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const cursor = revColl.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })
    // update single reviews by review id
    app.put('/review/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const update_data = req.body
      const option = { upsert: true }
      const updateUser = {
        $set: {
          review: update_data.review,
          review_message: update_data.review_message,
        },
      }
      const result = await revColl.updateOne(query, updateUser, option)
      // const cursor = revColl.find(query)
      // const result = await cursor.toArray()
      res.send(result)
    })

    // get reviews by product id
    app.get('/review/product/:id', async (req, res) => {
      const id = req.params.id
      console.log(id)
      const query = { porduct_id: id }
      const cursor = revColl.find(query)
      const result = await cursor.toArray()
      console.log(result)
      res.send(result)
    })

    // get user reviews by user id
    app.get('/review/user/:id', async (req, res) => {
      const id = req.params.id
      const query = { user_id: id }
      const cursor = revColl.find(query)
      const result = await cursor.toArray()
      res.send(result)
    })
    // delete user reviews
    app.delete('/review/user/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await revColl.deleteOne(query)
      res.send(result)
      console.log(result)
    })
  } finally {
  }
}
run().catch((err) => console.log(err))
app.listen(port, () => {
  console.log('server is run '.bgBlue)
})
