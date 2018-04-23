var app = app || {};

app.AlertArchiveManagementPageView =Backbone.View.extend({
    template: $('#alertArchiveManagementPageTpl').html(),
    initialize: function() {
         var options={
          format: 'yyyy-mm-dd',
          container: "container-dates",
          todayHighlight: true,
            autoclose: true,
            orientation:"top right",
            icons: {
                  date: "fa hl-calendar"
              }
        };
      setTimeout(function(){
          $('#datetimepicker6').datepicker(options).on('changeDate', function (selected) {
              minDate = new Date(selected.date.valueOf());
              $('#datetimepicker7').datepicker('setStartDate', minDate);
        });
        $('#datetimepicker7').datepicker(options).on("changeDate", function (selected) {
           maxDate = new Date(selected.date.valueOf());
            $('#datetimepicker6').datepicker("setEndDate", maxDate);
        });

    },1000);
       
        this.render();

    },

    render: function() {
        this.$el.html(this.template);
        console.log('Rendering AlertArchiveManagementPageView');
        this.alertArchiveList = new app.AlertArchiveListView({el: $('#alertsArchiveList')});
        return this;
    },

    events: {
        'click #update' : 'update',
    },

    update: function() {
        var self = this;
        console.log("DATES :", minDate);
        console.log("DATES2 :", maxDate);
        // fromDate = minDate.toISOString();
        // toDate   = maxDate.toISOString();
         fromDate = $('#fromDate').val();
         toDate = $('#toDate').val();
		console.log("From Date :", fromDate);
        console.log("To Date :", toDate);
        $.ajax({
                    type: 'POST',
                    url: "/updateDate",
                    data:{fromDate:fromDate,toDate:toDate},
                    processData: true,
                    cache:false,
                    success: function(data) {
                      console.log("date" , data);
                      $('#alertsArchiveList').empty();
                      $('#alertsArchiveList').unbind();
                      $( "div.success").html("Alert updated Successfully.");
                      $( "div.success" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );  
                      self.renderUpdateDate(data);
                    },
                    error: function(data) {
                          
                    }
             });
    },

    renderUpdateDate: function(data) {
      $('.search-result-container').empty();
      $('.search-result-container').remove();
      $('.search-result-container').unbind();
    	console.log("render update date");
    	console.log("processing for loop");
      console.log("inside alert archive",data);
      for (var i=0;i<data.length;i++){
        this.renderUpdateDateList(data[i]);
      }
     return this;
  },

  renderUpdateDateList: function(data){
    var alertArchiveUpdateList = new app.AlertArchiveUpdateListView({ model: data });
    this.$el.append(alertArchiveUpdateList.render().el );
  } 
});