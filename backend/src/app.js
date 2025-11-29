import express from 'express';
import Routes from './routes/Routes.js';

const app = express();
 
app.get('/', (req,res) => {
    res.send("Hello!")
})


export default app;