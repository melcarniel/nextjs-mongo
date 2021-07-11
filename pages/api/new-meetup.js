import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect(`${process.env.URL_MONGO}`)
        const db =  client.db();

        const meetupsCollections = db.collection('meetups');

        await meetupsCollections.insertOne(data);
        client.close();

        res.status(201).json({ message: 'Insert success' });
    }
}

export default handler;