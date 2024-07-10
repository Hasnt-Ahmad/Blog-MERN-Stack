const express = require('express');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cors());

const uri = 'mongodb://localhost:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2';
const client = new MongoClient(uri);

let db;

// Connect to MongoDB
client.connect()
  .then(() => {
    db = client.db('blogpost');
    console.log('Connected to MongoDB');
    db.collection('blogs').createIndex({ title: "text", content: "text", metaDescription: "text" });

    // get or add user
    app.post('/user', async (req, res) => {
        try {
            const { credential } = req.body;
    
            if (!credential || !credential.email) {
              return res.status(400).send('Invalid request data');
            }
    
            const email = credential.email;
            const userExist = await db.collection('users').findOne({ email });
    
            if (userExist) {
                return res.status(200).send({ message: 'User already exists' });
            }

            const newUser = {
                fullname: credential.name,
                email: credential.email,
                picture: credential.picture,
                createdAt: new Date(),
                modifiedAt: new Date()
              };
      
              const result = await db.collection('users').insertOne(newUser);
              res.status(201).send({ message: 'User created', id: result.insertedId });

        } catch (error) {
          console.error('Error fetching blog posts', error);
          res.status(500).send('Internal server error');
        }
      });

      app.post('/addpost', async (req, res) => {
        try {
            
            const { title, category, content, featuredImg, metaDescription, views, credential  } = req.body;
            const email = credential.email;
            const userExist = await db.collection('users').findOne({ email:email });

          let authorId;
          if (userExist) {
              authorId = userExist._id;
              
          }
            const newPost = {
              title: title,
              content: content,
              category: category,
              featuredImg: featuredImg,
              authorId: authorId,
              createdAt: new Date(),
              modifiedAt: new Date(),
              metaDescription:metaDescription,
              views:views
              };
      
              const result = await db.collection('blogs').insertOne(newPost);
              res.status(201).send({ message: 'Blog Added' });
              

        } catch (error) {
          console.error('Error fetching blog posts', error);
          res.status(500).send('Internal server error');
        }
      });

      app.delete('/post/:id', async (req, res) => {
        try {
          const postId = req.params.id; // Getting the postId from query params
          if (!postId) {
            return res.status(400).send({ message: 'Post ID is required' });
          }
      
          const result = await db.collection('blogs').deleteOne({ _id: new ObjectId(postId) });
      
          if (result.deletedCount === 0) {
            return res.status(404).send({ message: 'Post not found' });
          }
      
          res.status(200).send({ message: 'Blog deleted' });
        } catch (error) {
          console.error('Error deleting blog post', error);
          res.status(500).send('Internal server error');
        }
      });

      app.put('/post', async (req, res) => {
        try {
            
          const { title, category, content, featuredImg, metaDescription, credential , postId  } = req.body;
            const email = credential.email;
            const userExist = await db.collection('users').findOne({ email:email });

          let authorId;
          if (userExist) {
              authorId = userExist._id;
              
          }
            const updatePost = {
              title: title,
              content: content,
              category: category,
              featuredImg: featuredImg,
              authorId: authorId,
              metaDescription:metaDescription,
              modifiedAt: new Date()
              };
      
              const result = await db.collection('blogs').updateOne(
                { _id: new ObjectId(postId) }, // Filter to find the post by its ID
                { $set: updatePost } // Update operation
              );

          
              if (result.matchedCount === 0) {
                return res.status(404).send({ message: 'Post not found' });
              }
          
              res.status(200).send({ message: 'Blog Updated' });
            } catch (error) {
          console.error('Error fetching blog posts', error);
          res.status(500).send('Internal server error');
        }
      });
    
    // Define routes after successful connection
    app.get('/post', async (req, res) => {
      try {
        const { iss, sub, email } = req.query;  // Destructure credentials directly from query
    
        if (!email) {
          return res.status(400).send('Email is required');
        }
    
        const userExist = await db.collection('users').findOne({ email: email });
        if (!userExist) {
          return res.status(404).send('User not found');
        }
    
        const authorId = userExist._id;
        const blogPosts = await db.collection('blogs').find({ authorId: authorId }).toArray();
    
        res.status(200).send(blogPosts);
      } catch (error) {
        console.error('Error fetching blog posts', error);
        res.status(500).send('Internal server error');
      }
    });

    app.get('/categories', async (req, res) => {
      try {
        const categories = await db.collection('blogs').distinct("category");
        res.status(200).send(categories);
      } catch (error) {
        console.error('Error fetching blog posts', error);
        res.status(500).send('Internal server error');
      }
    });

    app.get('/catposts/:category', async (req, res) => {
      try {
          const category = req.params.category;
          const blogPosts = await db.collection('blogs').find({ category }).toArray();
          const users = await db.collection('users').find().toArray();
          const enrichedBlogPosts = blogPosts.map(post => {
          const author = users.find(user => user._id.toString() === post.authorId.toString());
          return {
            ...post,
            authorName: author ? author.fullname : 'Unknown', // assuming user document has a 'name' field
            authorImg: author ? author.picture : 'default-author-img-url' // assuming user document has a 'profileImage' field
          };
        });
  
        res.status(200).send(enrichedBlogPosts);
      } catch (error) {
          console.error('Error fetching blog posts', error);
          res.status(500).send('Internal server error');
      }
  });

    

    app.get('/posts', async (req, res) => {
      try {
        const blogPosts = await db.collection('blogs')
          .find()
          .sort({ createdAt: -1 }) 
          .limit(6) 
          .toArray(); 
        res.status(200).send(blogPosts);
      } catch (error) {
        console.error('Error fetching blog posts', error);
        res.status(500).send('Internal server error');
      }
    });

    app.get('/search', async (req, res) => {
      try {
        const { s } = req.query;
        const query = s ? { $text: { $search: s } } : {};
        const blogPosts = await db.collection('blogs').find(query).toArray();
        const users = await db.collection('users').find().toArray();
        const enrichedBlogPosts = blogPosts.map(post => {
        const author = users.find(user => user._id.toString() === post.authorId.toString());
        return {
          ...post,
          authorName: author ? author.fullname : 'Unknown', // assuming user document has a 'name' field
          authorImg: author ? author.picture : 'default-author-img-url' // assuming user document has a 'profileImage' field
        };
      });

      res.status(200).send(enrichedBlogPosts);
    } catch (error) {
        console.error('Error fetching blog posts', error);
        res.status(500).send('Internal server error');
      }
    });

    app.get('/popularposts', async (req, res) => {
      try {
        const blogPosts = await db.collection('blogs')
          .find()
          .limit(6) 
          .toArray(); 
          const users = await db.collection('users').find().toArray();
          const enrichedBlogPosts = blogPosts.map(post => {
          const author = users.find(user => user._id.toString() === post.authorId.toString());
          return {
            ...post,
            authorName: author ? author.fullname : 'Unknown', // assuming user document has a 'name' field
            authorImg: author ? author.picture : 'default-author-img-url' // assuming user document has a 'profileImage' field
          };
        });

        res.status(200).send(enrichedBlogPosts);
      } catch (error) {
        console.error('Error fetching blog posts', error);
        res.status(500).send('Internal server error');
      }
    });


    app.get('/newposts', async (req, res) => {
      try {
        const blogPosts = await db.collection('blogs')
          .find()
          .limit(6)
          .sort({ createdAt: -1 })
          .toArray();
    
        const users = await db.collection('users').find().toArray();
    
        const enrichedBlogPosts = blogPosts.map(post => {
          const author = users.find(user => user._id.toString() === post.authorId.toString());
          
          if (!author) {
            console.log(`Author not found for post with authorId: ${post.authorId}`);
          }
          
          return {
            ...post,
            authorName: author ? author.fullname : 'Unknown',
            authorImg: author ? author.picture : 'default-author-img-url'
          };
        });
    
        res.status(200).send(enrichedBlogPosts);
      } catch (error) {
        console.error('Error fetching blog posts', error);
        res.status(500).send('Internal server error');
      }
    });

    

    
    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
