module.exports = {

  getAllnews: function(req,res) {
    var sql = " SELECT a.id as id, a.geo_id as geo_id, g.name as geo_name , a.news_content as news_content, date_format(a.news_date,'%Y-%m-%d') as news_date, a.created_by as created_by, a.modified_by as modified_by, a.created_date as created_date, a.modified_date as modified_date " + 
              " FROM news a, geography g WHERE a.geo_id =g.id  and g.status=true ";
     if (req.param('limit') && req.param('limit') != undefined) {
        var limit = req.param('limit');
        sql = sql + " ORDER BY id DESC LIMIT " + limit;
        if (req.param('offset') && req.param('offset') != undefined) {
          var offset = req.param('offset');
          sql = sql + " OFFSET " + offset;
        } else {
          sql = sql + " OFFSET 0 ";
        }
      }    

      News.query(sql, function(err, news) {
            if(err) {
              console.log(err);
              return res.json({ err: err }, 500);
            } else {
                console.log("Master news");
                console.log(news);
                res.json(news);
            }
        });
      }, 

  findByNews: function(req, res){
      console.log('news :: id :: ' + req.params.id);
      var sql = "select * from news where id = ? ";
      News.query(sql,[req.params.id],function(err, news) {
          if(err) {
            console.log(err);
            return res.json({ err: err }, 500);

          } else {
               res.json(news);
          }
      });
    },

  findGeoByNewsId : function(req,res){
      console.log('news :: id :: ' + req.params.id);
      var sql = "select g.* from news n,geography g where n.geo_id = g.id  and g.status=true and n.id =? ";
      Geography.query(sql,[req.params.id],function(err, geo) {
          if(err) {
            console.log(err);
            return res.json({ err: err }, 500);
          } else {
               res.json(geo);
          }
      });
    },

  create: function(req, res) {
          var newsFormData = (req.body) ? req.body : undefined;
          console.log("Create News" +newsFormData);
          var news = {};
          console.log('STEP-1:Insert into News Table');
          var newsData = {
            geo_id       : newsFormData.geo_id,
            news_content : newsFormData.news_content,
            news_date    : newsFormData.news_date
          };

          News.create(newsData).exec(function(err, result) {
            if(err) {
              Logger.log('debug', 'NewsController.create', 'STEP-1:News Table Insert error.', null, null);
              
              return res.json();

            } else {
              console.log(result);
              return res.json(200, result);
            }
          });
    },

  update: function(req, res) {
      var geographies;
      var newsFormData = (req.body) ? req.body : undefined;
      console.log("news form data :: " + JSON.stringify(newsFormData));
      async.series([
        //Update news table
        function(callback) {
          console.log('STEP-1:Update News table');
          sql = "UPDATE news SET geo_id  =?, news_content=?, modified_by=?, news_date=?,modified_date=now() WHERE id=? ";
          var params = [
            newsFormData.geo_id,
            newsFormData.news_content,
            req.session.user.id,
            newsFormData.news_date,
            newsFormData.id
          ];
          console.log("news form data :: " + params);
          News.query(sql, params, function(err, result) {
            if(err) {
              console.log(err);
              callback(err);
            } else {
              console.log(result);
              callback();
            }
          });
        },
       ], function(err) {
            if (err) {
                console.log(err);
                if ( err.hasOwnProperty('ecode'))
                  return res.send({ err: 'Exception caught while updating the news' }, 500);
              else    return res.json({ err: err }, 500);
              } else {
                console.log('New news Updated.');
                res.json({"status":"success"});
            }
      });

    },
   
  destroy : function(req,res){
        var newsFormData = (req.body) ? req.body : undefined;
        console.log("newsFormData");console.log(newsFormData);    
        var newsFormData = (req.body) ? req.body : undefined;
        var sql = "DELETE FROM news WHERE id=?";
        var params = [newsFormData.id];
        console.log("destroy news::params");console.log(params);
        News.query(sql, params, function (err, result) {
        if (err) {
                    console.log(err);
            Logger.log('error', 'NewsController.destroy', 'The following error occurred:', null, err);
                    return res.json({ err: err }, 500);
              } 
        else{
                    //res.send('success'); 
              return res.json(200, result);
                                
            }
         });
    }
}

