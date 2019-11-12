'user strict';
var sql = require('./db.js');

//Cabang object constructor
var Branch = function(branch){
    this.BRANCH_CODE = branch.branch_code;
    this.BRANCH_NAME = branch.branch_name;
    this.created_at = new Date();
};
Branch.createBranch = function (newBranch, result) {    
        sql.query("INSERT INTO ms_branch set ?", newBranch, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};
Branch.getBranchById = function (BranchID, result) {
        sql.query("Select BRANCH_NAME from ms_branch where ID = ? ", BranchID, function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};
Branch.getAllBranch = function (result) {
        sql.query("Select * from ms_branch", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('branch : ', res);  

                 result(null, res);
                }
            });   
};

Branch.updateById = function(id, branch, result){
  sql.query("UPDATE ms_branch SET branch_name = ? WHERE ID = ?", [branch.branch_name, id], function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};
Branch.remove = function(id, result){
     sql.query("DELETE FROM ms_branch WHERE ID = ?", [id], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

module.exports= Branch;