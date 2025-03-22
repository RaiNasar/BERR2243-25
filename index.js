const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("testDB");
        const collection = db.collection("users");
        const start = Date.now();

        await client.connect();
        console.log("Connected to MongoDB!", Date.now() - start, "ms");

        // Insert a document
        await collection.insertOne({ name: "Raidah Adliana", birth_year: 2003 });
        console.log("Document inserted!");

        // Query the document
        const result = await collection.findOne({ name: "Raidah Adliana" });
        console.log("Query result:", result);
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

main();