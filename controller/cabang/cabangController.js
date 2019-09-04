'use strict';

var Branch = require('../../model/cabangModel.js');

exports.list_all_branch = function(req, res) {
  Branch.getAllBranch(function(err, branch) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', branch);
      res.send({ branch });
  });
};



exports.create_a_branch = function(req, res) {
  var new_branch = new Branch(req.body);

  //handles null error 
  if(!new_branch.branch_name || !new_branch.branch_code){

            res.status(400).send({ error:true, message: 'Please provide branch' });

        }
  else{    
    Branch.createBranch(new_branch, function(err, branch) {      
      if (err)
        res.send(err);
      res.json(branch);
    });
  }
};


exports.read_a_branch = function(req, res) {
  Branch.getBranchById(req.params.branchID, function(err, branch) {
    if (err)
    res.send(err);
    res.json(branch);
  });
};


exports.update_a_branch = function(req, res) {
  Branch.updateById(req.params.branchID, new Branch(req.body), function(err, branch) {
    if (err)
      res.send(err);
    res.json(branch);
  });
};


exports.delete_a_branch = function(req, res) {


  Branch.remove( req.params.branchID, function(err, branch) {
    if (err)
      res.send(err);
    res.json({ message: 'Branch successfully deleted' });
  });
};