var admin = admin || {};

admin.MgmtSubDocCollectionView = Backbone.View.extend({

    initialize: function(options) {
        console.log('Initialize SubDocCollectionView');
        console.log('subDocCollection');
        if( options.subDocCollection != undefined )
        {        
            console.log(options.subDocCollection);
            this.subDocCollection = options.subDocCollection;
        }
        _.bindAll(this, "renderSubDoc");
        _.bindAll(this, "render");
         template = '<div class="form-group"><label id="selectsubDocument" for="selectsubDocument" class="col-sm-3 control-label">Sub Document</label> <div class="col-sm-9"> <select id="selectsubSubDocument" class="form-control subDoc reg_parent_control" > <option value="">Select</option> </select><div id="sub_doc_error" class="reg_error" style="font-size: 12px; color: #FF0000; "></div></div></div>';
              
        console.log(template);
        this.render();
    },   

     events: {
      'change' : 'isSelected',
      'change .subDoc': 'subDoc'
    },


    render: function() {
        console.log('Rendering SubDoc');
        this.$el.html( '<option value="">Select</option>' );
        if(  this.collection ) {
            this.collection.each(function(item) {
            console.log(item.get('id'));
            console.log(item.get('name'));
                this.renderSubDoc(item);
            }, this );
        }
        return this;
    },

    renderSubDoc: function( item ) {
        var SubDocRowView = new admin.SubDocRowView({
            model: item
        });
        this.$el.append( SubDocRowView.render().el );
    },

    isSelected: function(e) { 
        e.preventDefault();

        console.log('document Triggered in MgmtSubDocCollectionView'); 
        var subdocId = parseInt($(this.el).val(), 10);
        console.log('subdocId: ', subdocId);
        // if( this.endChain != this.title ) {
        console.log(this.subDocCollection);
        // var  subdocArray = this.subDocCollection;

        if (this.subDocCollection.length > 0) 
        {
            // var subDocCollection = new admin.SubDocumentCollection(subdocArray); 
        var filter = {parent_id: subdocId};    
        var subCollection = this.subDocCollection.where(filter);
        console.log("subCollection",subCollection);
        console.log(template);
        if(subCollection.length !== 0){

            $('#subdocgroup').append(template);
            var $select = $('#subdocgroup').find('select:last');
            $(subCollection).each(function (index, item) {   
                var name = item.get('name');
                var subID = item.get('id');
                var $option = $("<option/>").attr("value", subID).text(name);
                $select.append($option);
            });
            $('.reg_parent_control').bind('change',  this.isSelected);
        }else{
        
            $('#selectsubSubDocument').hide();
        }
                   
            }              
         
                  
      },

      subDoc: function(){
        console.log("sub doc triggers");
        
      }
});
