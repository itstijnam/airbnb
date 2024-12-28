const path =  require('path')
const rootDir = require('../utils/pathUtils')

exports.pageNotFound = (req,res)=>{
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
}


// exports.pageNotFound = (req,res)=>{
//     res.status(404).render('../', 'views', '404.html');
// }