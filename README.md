# BERR2243-25
Hai everyone
#!/bin/bash

# Step 1: Install Development Tools

# Install VSCode (Ubuntu/Debian example)
echo "Installing VSCode..."
sudo apt update
sudo apt install -y curl
curl -L https://go.microsoft.com/fwlink/?LinkID=760868 -o vscode.deb
sudo apt install -y ./vscode.deb
rm vscode.deb

# Install NodeJS & npm
echo "Installing NodeJS & npm..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Verify NodeJS and npm installation
echo "NodeJS version:"
node --version
echo "npm version:"
npm --version

# Install MongoDB (Ubuntu/Debian example)
echo "Installing MongoDB..."
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org

# Start MongoDB service
echo "Starting MongoDB service..."
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Git
echo "Installing Git..."
sudo apt install -y git

# Configure Git username and email
echo "Configuring Git..."
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Install MongoDB Compass (Optional)
echo "Installing MongoDB Compass..."
wget https://downloads.mongodb.com/compass/mongodb-compass_1.36.4_amd64.deb
sudo apt install -y ./mongodb-compass_1.36.4_amd64.deb
rm mongodb-compass_1.36.4_amd64.deb

# Step 2: Git Basics & Repository Setup

# Create a new directory for the project
echo "Creating project directory..."
mkdir my-first-project
cd my-first-project

# Initialize a new Git repository
echo "Initializing Git repository..."
git init

# Create a README.md file
echo "Creating README.md..."
echo "# My First Project" > README.md
echo "This is a simple NodeJS project that connects to MongoDB." >> README.md

# Step 3: Create a "Hello MongoDB" NodeJS Script

# Initialize a NodeJS project
echo "Initializing NodeJS project..."
npm init -y

# Install MongoDB driver
echo "Installing MongoDB driver..."
npm install mongodb

# Create index.js file
echo "Creating index.js..."
cat <<EOL > index.js
const { MongoClient } = require('mongodb');

async function main() {
  const url = "mongodb://localhost:27017"; // MongoDB connection URL
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("testDB");
    const collection = db.collection("users");

    // Insert a document
    await collection.insertOne({ name: "Alice", age: 25 });
    console.log("Document inserted!");

    // Query the document
    const result = await collection.findOne({ name: "Alice" });
    console.log("Query result:", result);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

main();
EOL

# Step 4: Push Code to GitHub

# Create .gitignore file
echo "Creating .gitignore..."
echo "/node_modules" > .gitignore

# Commit and push to GitHub
echo "Committing and pushing to GitHub..."
git add .
git commit -m "Initial commit: Setup documentation"
git branch -M main
git remote add origin https://github.com/your-username/my-first-project.git
git push -u origin main

echo "Setup complete! 🎉"