import * as THREE from 'three';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const port = 2000

app.post('/', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Content-Type", "application/json");
   
    const geometry = new THREE.ConeGeometry( req.body.data.d, req.body.data.h, req.body.data.n )
    const material = new THREE.MeshPhongMaterial( {color: 0x9E1B32} )
    let cone = new THREE.Mesh( geometry, material )
  
    // res.send( req.data )
    // console.log(req.body)
    // res.json({ data: req.body })

    res.send( cone )
    // next(); // pass control to the next handler
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
