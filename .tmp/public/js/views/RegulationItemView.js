var app = app || {};

app.RegulationItemView = Backbone.View.extend({
    tagName: 'div',
    template: _.template( $( '#regItemTpl' ).html() ),

    events: {
        'change .checkbox-custom' : 'isChecked' 
    },

    render: function() {
        this.$el.html( this.template( this.model.attributes ) );
        return this;
    },

    isChecked: function(e) {
        e.preventDefault
        var is_Checked = $(e.target).prop('checked'); //***This also works. FYI***
        // var elementId = this.model.get('checkbox_id');
        // var is_Checked  = $("#" + elementId).prop('checked');
        this.model.set('is_selected', is_Checked);
        console.log(this.model.get('is_selected'));
    }

    
});	