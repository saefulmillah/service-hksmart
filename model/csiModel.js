'user strict'
var sql = require('./db.js')

//Cabang object constructor
var Csi = function(csi){
    this.start_date = csi.start_date
}

Csi.get_feedback = function (query, result) {
    var a = query
    var q = "SELECT f.id, f.id_user, f.answer, q.id AS id_feedback, q.feedback_item, a.id AS id_aspect, a.aspect, b.BRANCH_NAME FROM `t_feedback` f INNER JOIN m_question_feedback q ON f.id_feedback = q.id INNER JOIN m_aspect a ON a.id = q.id_aspect INNER JOIN ms_branch b ON f.id_ruas = b.ID WHERE f.created_at BETWEEN ? and ?"
        sql.query(q, [a.start_date, a.end_date], function (err, res) {

        if(err) {
            console.log("error: ", err)
            result(null, err)
        }
        else{
          console.log('branch : ', res)  

         result(null, res)
        }
    })   
}

Csi.get_rating = function (query, result) {
    var a = query
    var q = "SELECT r.id, r.id_user, r.score, q.id as id_question, q.question_item, a.id as id_aspect, a.aspect, b.BRANCH_NAME FROM `t_rating` r INNER JOIN m_question_rating q ON r.id_question = q.id INNER JOIN m_aspect a ON a.id = q.id_aspect INNER JOIN ms_branch b ON r.id_ruas=b.ID WHERE r.created_at BETWEEN ? and ?"
        sql.query(q, [a.start_date, a.end_date], function (err, res) {

        if(err) {
            console.log("error: ", err)
            result(null, err)
        }
        else{
          console.log('branch : ', res)  

         result(null, res)
        }
    })   
}

module.exports = Csi

