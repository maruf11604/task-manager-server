const express = require('express');
const cors = require('cors')
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hai1jds.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {


    try {
        const addTaskCollection = client.db('taskManager').collection('addtask')

        app.post('/addtask', async (req, res) => {
            const task = req.body;
            const result = await addTaskCollection.insertOne(task)
            res.send(result)
        });
        app.get('/addtask', async (req, res) => {
            const email = req.query.email;

            const query = { email: email };
            const options = await addTaskCollection.find(query).toArray();
            res.send(options)
            console.log(options)
        })

        app.get('/addtask/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const more = await addTaskCollection.findOne(query);
            res.send(more);
        })
    }
    finally {

    }
}
run().catch(err => console.error(err))


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})