const express = require('express')
const multer = require('multer')
const path = require('path')


const db = require('./config/db')
const cors = require('cors')

const bcrypt = require('bcrypt');
const saltRounds = 7;



const app = express()
const PORT = 3002
app.use(cors())
app.use(express.json())

// Code I copied to upload image to image folder
const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname, '../client/src/images'))
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
})

// Get all staff for about page in db

app.get("/api/staff/get", (req,res)=>{
    db.query("SELECT * FROM staff", (err,result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

// Add staff to db

app.post('/api/staff/create', (req, res) => {
    console.log("data create for mailing")
    const name = req.body.name
    const job = req.body.job;
    const bio = req.body.bio;
    const image = req.body.image;

    db.query("INSERT INTO staff (Name, Job, Bio, Image) VALUES (?, ?)", [name, job, bio, image], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
            return;
        }
        res.status(200).send('Data inserted successfully');
    })
})

// Query for sending name and email to mailing table
app.post('/api/mailing/create', (req, res) => {
    console.log("data create for mailing")
    const name = req.body.name
    const email = req.body.email;

    db.query("INSERT INTO mailing (name, email) VALUES (?, ?)", [name, email], (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal server error');
          return;
        }
        res.status(200).send('Data inserted successfully');
      })
    })


// Query to get all events from events table
app.get("/api/events/get", (req,res)=>{
    console.log("events got")
    db.query("SELECT * FROM events", (err,result)=>{
        if(err) {
            console.log(err)
            res.status(500).send("Error getting events")
        }
        res.send(result)
        console.log(result)
    })  
})

app.delete('/api/events/delete/:Id', (req, res) => {
    const id = req.params.Id
    console.log(id)
    db.query("DELETE FROM events WHERE Id = ?", id, (err, result)=>{
        if(err) {
            console.log(err)
            res.status(500).send('Error deleting user')
        }
            res.send(result)
    })
})


// Query to create an event an add it to the event table and uploads the image
app.post('/api/events/create', upload.single('Image'), (req, res) => {
    console.log("event created")
    //const id = req.body.Id
    const title = req.body.Title
    const date = req.body.Date
    const description = req.body.Description
    const image = req.file ? req.file.filename : ''
    const location = req.body.Location
    console.log(image)

    // right now its capitalzied just like the table but i will change all to lowercase later
    // not sure if i will cuz capitals is used everywhere now :skull:

    db.query("INSERT INTO events (Title, Date, Description, Image, Location) VALUES (?,?,?,?,?)",[title, date, description, image, location], (err,result)=>{
        if (err) {
            console.error(err)
            res.status(500).send('Internal server error')
            return
        }
        res.status(200).send('Data inserted successfully')
    })
    
})

//Query to check if password entered is the same as the one in the db.
app.post('/api/users/post', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.error(err)
            res.status(500).send('Internal server error')
            return
        }
      
        if (results.length > 0) {
            const user = results[0];
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            
            /*console.log("Stored password hash: ", user.password);
            console.log("Inputted password hash: ", await bcrypt.hash(password, saltRounds));
            console.log("Is password match: ", isPasswordMatch);*/
            
            if (isPasswordMatch) {
              res.status(200).send('Login successful')
            } else {
              res.status(401).send('Invalid username or password')
            }
        } else {
            res.status(401).send('Invalid username or password')
        }
    })
})

//Query to get user data
app.get("/api/users/get", (req, res) =>{
    db.query("SELECT id, name, email, role, created, updated, last_login FROM users", (err, result) => {
        if(err) {
            console.log(err)
        }
        res.send(result)
    })
})


// Route to get one post (not used atm)
app.get("/api/event/:id", (req,res)=>{
    const id = req.params.id;
    db.query("SELECT * FROM events WHERE id = ?", id,
        (err,result)=>{
            if(err) {
                console.log(err)
            }
            res.send(result)
        });   });


app.delete('/api/users/delete/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    db.query("DELETE FROM users WHERE id = ?", id, (err, result)=>{
        if(err) {
            console.log(err)
            res.status(500).send('Error deleting user')
        }
            res.send(result)
    })
})

//Query to update user in db.
app.put('/api/users/put/:id', (req, res) => {
    const id = req.params.id
    console.log(id) 

    const name = req.body.name
    const email = req.body.email
    const password = bcrypt.hashSync(req.body.password, saltRounds)
    const role = req.body.role
    const updated = req.body.updated

    db.query("UPDATE users SET name = ?, email = ?, password = ?, role = ?, updated = ? WHERE id = ?", [name, email, password, role, updated, id], (err, result)=>{
        if(err) {
            console.log(err)
            res.status(500).send('Error deleting user')
        }
            res.send(result)
    })
})

//Query to update event (not fully working a the moment)
app.put('/api/events/put/:id', upload.single('image'), async (req, res, next) => {
    
    const id = req.params.id
    console.log(id)

    const title = req.body.title
    const date = req.body.date
    const description = req.body.description
    const location = req.body.location
    const image = req.file

    // MySQL query to insert the data into the database
    db.query("UPDATE events SET Title = ?, Date = ?, Description = ?, Location = ?, Image = ? WHERE Id = ?", [title, date, description, location, image, id], (err, result) => {
        if(err) {
            console.log(err)
            res.status(500).send('Error Updating Event')
        }
            res.send(result)
    })
})




// Route to like a post (not used atm)
app.post('/api/like/:id',(req,res)=>{

    const id = req.params.id;
    db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
        if(err) {
            console.log(err)   }
        console.log(result)
    });
});

// Route to delete a post (not used atm)
app.delete('/api/delete/:id',(req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
        if(err) {
            console.log(err)
        } }) })

//RUN server on port 
app.listen(PORT, ()=>{
    console.log(`Server is running on ＄{PORT}`)
})


// Query to get donation link
app.get("/api/donation/get", (req,res)=>{

    db.query("SELECT * FROM donate_link", (err,result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    });   
});

app.put('/api/donation/put', (req, res) => {

    const link = req.body.donateLink

    db.query("UPDATE donate_link SET link = ?", [link], (err, result)=>{
        if(err) {
            console.log(err)
            res.status(500).send('Error deleting user')
        }
            res.send(result)
    })
})