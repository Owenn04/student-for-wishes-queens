const express = require('express')
const db = require('./config/db')
const cors = require('cors')

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

// Route to get all posts
app.get("/api/events/get", (req,res)=>{

    db.query("SELECT * FROM events", (err,result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    });   });

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

// Route for creating the an event
app.post('/api/events/create', (req,res)=> {
    console.log("event created")
    //const id = req.body.Id
    const title = req.params.Title
    const date = req.params.Date
    const description = req.params.Description
    const image = req.params.Image
    const location = req.params.Location

    console.log(title)

    // right now its capitalzied just like the table but i will change all to lowercase later

    db.query("INSERT INTO events (Title, Date, Description, Image, Location) VALUES (?,?,?,?,?)",[title, date, description, image, location], (err,result)=>{
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
            return;
          }
          res.status(200).send('Data inserted successfully');
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
