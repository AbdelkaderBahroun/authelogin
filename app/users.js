
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM users',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('users',{page_title:"User Index",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
  
};

exports.add = function(req, res){
  res.render('add_user',{page_title:"Add users"});
};

exports.edit = function(req, res){
    
    var id = req.params.id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM users WHERE id = ?',[id],function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('edit_user',{page_title:"Edit User ",data:rows});
                
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the user*/
exports.save = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.username,
            email   : input.password,
            phone   : input.role,

        
        };
        
        var query = connection.query("INSERT INTO users set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('users');
          
        });
        
       // console.log(query.sql); get raw query
    
    });
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            
            name    : input.username,
            email   : input.password,
            phone   : input.role,
        
        };
        
        connection.query("UPDATE users set ? WHERE id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/users');
          
        });
    
    });
};


exports.delete_user = function(req,res){
          
     var id = req.params.id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM users  WHERE id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/users');
             
        });
        
     });
};


