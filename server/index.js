const express = require('express')
const db = require('./config/db')
const cors = require('cors')

const bcrypt = require('bcrypt');
const saltRounds = 7;


const app = express()
const PORT = 3002
app.use(cors())
app.use(express.json())


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

    db.query("SELECT * FROM events", (err,result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    });   
});

// Query to create an event an add it to the mailing table
app.post('/api/events/create', (req,res)=> {
    console.log("event created")
    //const id = req.body.Id
    const title = req.body.Title
    const date = req.body.Date
    const description = req.body.Description
    const image = req.body.Image
    const location = req.body.Location


    // right now its capitalzied just like the table but i will change all to lowercase later

    db.query("INSERT INTO events (Title, Date, Description, Image, Location) VALUES (?,?,?,?,?)",[title, date, description, image, location], (err,result)=>{
        if (err) {
            console.error(err)
            res.status(500).send('Internal server error')
            return
          }
          res.status(200).send('Data inserted successfully')
        }) 
    })

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



app.get("/api/users/get", (req, res) =>{
    db.query("SELECT id, name, email, role, created, updated, last_login FROM users", (err, result) => {
        if(err) {
            console.log(err)
        }
        res.send(result)
    })
})



// Route to get one post
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

app.put('/api/users/put/:id', (req, res) => {
    const id = req.params.id
    console.log(id) 

    const name = req.body.name
    const email = req.body.email
    const password = bcrypt.hashSync(req.body.password, salt)
    const role = req.body.role
    const updated = req.body.updated

    db.query("UPDATE users SET name = ?, email = ?, password = ? role = ?, updated = ? WHERE id = ?", [name, email, password, role, updated, id], (err, result)=>{
        if(err) {
            console.log(err)
            res.status(500).send('Error deleting user')
        }
            res.send(result)
    })
})



// Route to like a post
app.post('/api/like/:id',(req,res)=>{

    const id = req.params.id;
    db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
        if(err) {
            console.log(err)   }
        console.log(result)
    });
});

// Route to delete a post

app.delete('/api/delete/:id',(req,res)=>{
    const id = req.params.id;

    db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
        if(err) {
            console.log(err)
        } }) })

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