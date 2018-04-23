var app = app || {};

app.UserSubscriptionListView = Backbone.View.extend({

	//el: $( '#subscriptionList'),
	initialize: function() {
    	console.log('Initialize ProfileSubscriptionListView');
		var _selfReference = this;
		this.collection = new app.SubscriptionCollection(); 
		subsoffset = 0;
		console.log('subslimit : subsoffset');
	    console.log(subslimit + ' : ' + subsoffset);	 
	    console.log(this.collection);
            app.ClientAppRouter.origin = 0;
	    this.render();
	    // this.listenTo( this.collection, 'add', this.renderSubscription );
	    //this.listenTo( this.collection, 'reset', this.render );
	    // this.listenTo( this.collection, 'sort', this.render );
	    // _.bindAll(this, "renderSubscription");
	    // _.bindAll(this, "render");
	},

	render: function() {
		self=this;
		 $.when(self.collection.fetch({
		  	wait:true, 
		  	reset: true, 
		  	data: { limit: subslimit, offset: subsoffset }, 
		  	processData: true
		  })).done( function(){
		  	 //_selfReference.render();
		  	// setTimeout(function(){
		  //	 	$('[data-toggle="table"]').bootstrapTable();
		  	// },1000000);
		  	console.log(self.collection.toJSON());
			$('[data-toggle="table"]').bootstrapTable({data:self.collection.toJSON()});
      $('[data-toggle="table"]').removeClass('table-hover');
      //$('[data-toggle="table"]').tablesorter();
      // setTimeout(function(){
      //       $('[data-field="Domain"]').find('div').addClass('desc').css('background-image','url(../img/sort_desc.png)');
      //   },200);
			  var drawImage ='<div class="icon_cont_tr">'+
                          '<div class="supervisory_icon"></div>'+
                        '</div>';
        var drawBanking = '<div class="icon_cont_tr">' +
                          '<div class="banking_icon"></div>' +
                        '</div>';
        var drawCons = '<div class="icon_cont_tr">' +
                          '<div class="consumer_icon"></div>' +
                        '</div>';
        var drawPayment = '<div class="icon_cont_tr">' +
                          '<div class="services_icon"></div>' +
                        '</div>';
        var drawPensions = '<div class="icon_cont_tr">' +
                           '<div class="pensions_icon"></div>' +
                        '</div>';
        var drawIns = '<div class="icon_cont_tr">' +
                           '<div class="insurance_icon"></div>' +
                        '</div>';
        var drawFinCrime = '<div class="icon_cont_tr">' +
                           '<div class="financial_crime_icon"></div>' +
                        '</div>';
        var drawFinmarket = '<div class="icon_cont_tr">' +
                           '<div class="financial_icon"></div>' +
                        '</div>';
        var drawPdf = '<div class="pdf-icon">' +
                        '</div>';
        var drawInteractive = '<div class="interactive">' +
                        '</div>';

       $('#drawProfileImage').find('tr ').each(function(tr){
          console.log("testing function :::::::");
          console.log("tr ::", $(this).find("td:first-child").text());
          var image = $(this).find("td:first-child").text();
          console.log(image);
          if(image == 'Supervisory'){
            $(this).find("td:first-child").prepend(drawImage);
         // $(this).find("td:last-child").hide();
             
          }
           else if(image == 'Banking & Credit Union'){
            $(this).find("td:first-child").prepend(drawBanking);
            
          }
          else if(image == 'Consumer Finance'){
            $(this).find("td:first-child").prepend(drawCons);
            
          }
          else if(image == 'Payment Services'){
            $(this).find("td:first-child").prepend(drawPayment);
            
          }
          else if(image == 'Payment Services'){
            $(this).find("td:first-child").prepend(drawPayment);
           
          }
          else if(image == 'Pensions'){
            $(this).find("td:first-child").prepend(drawPensions);
            
          }
          else if(image == 'Insurance'){
            $(this).find("td:first-child").prepend(drawIns);

          }
          else if(image == 'Financial Markets'){
            $(this).find("td:first-child").prepend(drawFinmarket);
          }
          else if(image == 'Financial crime'){
            $(this).find("td:first-child").prepend(drawFinCrime);
          }
              
       //    var access = $("th:last-child").text();
       // if(access == 'Access'){
          // $("td:last-child").append('<a id="accessLib" class="btn btn-success btn-rounded btn-block floatLeft btn-bigger">Access Now</a>');
       // }

       });

       

       // $('#drawProfileImage').find('tr ').each(function(tr){
       //    console.log("testing function :::::::");
       //    console.log("tr ::", $(this).find("td:last-child").text());
       //    var image = $(this).find("td:last-child").text();
       //    console.log(image);

       //    if(image == 'Summary'){
       //      console.log("inside the summary");
       //      console.log("td last child",$(this).find("td:last-child").text());
       //      $(this).find("td:last-child").html('<td class="doc-type"><div class="pdf-icon">Summary</div></td>');
            
       //    }
       //    else if(image == 'Document'){
       //      $(this).find("td:last-child").html('<td class="doc-type"><div class="pdf-icon">Document</div></td>');
            
       //    }
       //    else if(image == 'LyfeCycle'){
       //      $(this).find("td:last-child").html('<td class="doc-type"><div class="interactive">LyfeCycle</div></td>');
            
       //    }
       //    else if(image == 'Regulatory Tracker Level 1'){
       //      $(this).find("td:last-child").html('<td class="doc-type"><div class="interactive">Regulatory Tracker Level 1</div></td>');
            
       //    }
       //    else if(image == 'Regulatory Tracker Level 2'){
       //      $(this).find("td:last-child").html('<td class="doc-type"><div class="interactive">Regulatory Tracker Level 2</div></td>');

       //    }
       //    else if(image == 'LifeCycle Tacker'){
       //      $(this).find("td:last-child").html('<div class="interactive">LifeCycle Tacker</div></td>');
       //    }
       //    else if(image == 'Key Timeliness'){
       //      $(this).find("td:last-child").html('<td class="doc-type"><div class="pdf-icon">Key Timelines</div></td>');
       //    }
              

       // });
		  	 
		  });

    console.log("length",this.collection.length);
	  if (this.collection.length <= subslimit) {
			$('#findStatus').html("End Of Records");
			$('#loadMoreSubscription').hide();
		} else {
			$('#findStatus').html("");
			$('#loadMoreSubscription').show();			
		}
		
	  	return this;  
	},

	renderSubscription:function(item){
		var userSubscriptionItemView = new app.UserSubscriptionItemView({
			model: item
		});
	    this.$el.append(userSubscriptionItemView.render().el );
	    
	},


});
