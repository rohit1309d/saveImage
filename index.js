var express = require('express');
var app = express();
var cors = require('cors');
var fs = require('fs');
var formidable = require("formidable");
app.use(cors())

app.post('/upload',function(req, res) {

    var imageName = 'images/' +  Date.now() + '-canvas.png';

    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var photo = form.openedFiles[0]
        
        var oldPath = photo.path;
        var rawData = fs.readFileSync(oldPath)
      
        fs.writeFile(imageName, rawData, function(err){
            if(err) console.log(err)
            return res.send("Successfully uploaded")
        })
      });

});

app.listen(8000, function() {
    console.log('App running on port 8000');
});