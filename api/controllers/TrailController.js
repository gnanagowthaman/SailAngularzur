module.exports = {
	

	find: function(req,res){
      sql="select permission_id from user_permission where user_id=?  and  permission_id=6";
      params=[req.session.user.id];
      console.log("check the params", req.session.user.id);

      Permission.query(sql,params, function(err,result){
             if (err) {
                  return res.json(500, { errCode: 500 , errMsg: 'File permission problem, please contact administrator.' });
             }else{
              console.log('RESEULT', result); 
              if (result.length == 0) {
                  res.status(200).json({permission_id: 0});
              } else {
                  res.status(200).json(result[0]);
              }   
             
             }

      });

	}
}

  