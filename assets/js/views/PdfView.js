var app = app || {};

app.PdfView = Backbone.View.extend({
    el : $("#canvas"),
    initialize: function() {
        app.ClientAppRouter.currentopendoc = 'pdf';
        _.bindAll(this, "render");
    },
    events: {
      'click .didclass': 'domSelected',
       'click  #forsea':'search',
        'click .trail_download':'trailuser_check',
      
    },

    domSelected : function(e) {
    },

    render :function (options) {
      this.pageUrl =  'documents/publish' + options.path;
      this.pdfpath = 'documents/publish' + options.path;  
      this.selectedDocEl = options.selectedDocEl;
      console.log('padf-path:' + options.path);
      this.$el.children().remove();
      var _self = this;
      // var _self = this;
      //Promise.all([ "pdf.js", "pdf.worker.js"
      //           ]).then(function(modules) {

      if (!PDFJS.PDFViewer || !PDFJS.getDocument) {
      	 console.log("PDFJS Not loaded");
      }
      PDFJS.workerSrc = 'plugins/pdfjs-dist/build/pdf.worker.js';
      var container = document.getElementById("canvas");
      var d = document.createElement("div");
      d.id ="viewer";
      d.className = "pdfViewer";
      container.appendChild(d);
      this.$el.append('<div id="forsea"></div>');
     
      // linking inside the PDF document.
      var pdfLinkService = new PDFJS.PDFLinkService();
      var pdfViewer = new PDFJS.PDFViewer({
          container: container,
          linkService: pdfLinkService,
      });
      console.log("here 2"); 
      pdfLinkService.setViewer(pdfViewer);
      console.log("here 3"); 
      // find controller.
      var pdfFindController = new PDFJS.PDFFindController({
          pdfViewer: pdfViewer
      });
      console.log("here 4"); 
      pdfViewer.setFindController(pdfFindController);
      console.log("here 5");
      container.addEventListener('pagesinit', function () {
    	// We can use pdfViewer now, e.g. let's change default scale.
          pdfViewer.currentScaleValue = 'page-width';
 
      });

      this.drawSearchAndDownload();
     // For remove and append the Download button & Regulation title on top and bottom
      // $('#rendersec , #Textdiv').remove();
      // console.log("For checking path ", options.path)
      // $('.widget').append('<div id="Textdiv" class="input-group input-group-search" style="left: 470px;"><input id="searchPdfTxt" placeholder="Search for..." class="form-control" type="text"><span class="input-group-btn"><button id="goSearch" type="button" class="btn btn-outline">Go!</button></span></div>' + "<a id='rendersec'  target='_blank' href='"+pdfpath +"' download><button class='docload' type='submit'>Download</button></a>" );


      PDFJS.getDocument(this.pageUrl).then(function (pdfDocument) {
        // Document loaded, specifying document for the viewer and
        // the (optional) linkService.
            pdfViewer.setDocument(pdfDocument);
            pdfLinkService.setDocument(pdfDocument, null);
            _self.selectedDocEl.addClass('docclick');//enable click even in TreeView
      });
      //});

      $("#canvas").bind("contextmenu", function(e) {
            e.preventDefault();
            return false;
      });

      // $("#searchPdfTxt").on('keyup',function(e) {
      //   e.preventDefault();
      //   console.log("inside the function2");
      //   if (e.keyCode === 13) {
      //     $('#forsea').trigger('click');
      //   }
      // }); 
      // $("#goSearch").on('click',function(e) {
      //   e.preventDefault();
      //   console.log("inside the function3");
      //     $('#forsea').trigger('click');
      // });  
    },


    drawSearchAndDownload: function() {
      $('#rendersec , #Textdiv').remove();
      if (app.ClientAppRouter.trail_user == true) {
        $('#panelHeader').append(
            "<a id='rendersec' class='trail_download' target='_blank' href='"+this.pdfpath +"' download>" +
              '<button type="submit" class="btn btn-success btn-rounded btn-block button-with-icon"><span>Download PDF</span> <img src="img/button_pdf.svg" width="19" height="19" alt="Download PDF"></button>' + 
            "</a>" +
            '<div id="Textdiv" class="input-group input-group-search-uview zsearch">' +
              '<input id="searchTxt" type="text" placeholder="QUICK SEARCH" class="form-control">' +
              '<span class="input-group-btn"><button id="goSearch" type="button" class="btn btn-outline btn-default"></button></span>' +
            '</div>'
        );

        $('#panelFooter').append(
            "<a id='rendersec' class='trail_download' target='_blank' href='"+this.pdfpath +"' download>" +
              '<button type="submit" class="btn btn-success btn-rounded btn-block button-with-icon"><span>Download PDF</span> <img src="img/button_pdf.svg" width="19" height="19" alt="Download PDF"></button>' + 
            "</a>");
      } else {
        $('#panelHeader').append(
            "<a id='rendersec' target='_blank' href='"+this.pdfpath +"' download>" +
              '<button type="submit" class="btn btn-success btn-rounded btn-block button-with-icon"><span>Download PDF</span> <img src="img/button_pdf.svg" width="19" height="19" alt="Download PDF"></button>' + 
            "</a>" +
            '<div id="Textdiv" class="input-group input-group-search-uview zsearch">' +
              '<input id="searchTxt" type="text" placeholder="QUICK SEARCH" class="form-control">' +
              '<span class="input-group-btn"><button id="goSearch" type="button" class="btn btn-outline btn-default"></button></span>' +
            '</div>'
        );

        $('#panelFooter').append(
            "<a id='rendersec' target='_blank' href='"+this.pdfpath +"' download>" +
              '<button type="submit" class="btn btn-success btn-rounded btn-block button-with-icon"><span>Download PDF</span> <img src="img/button_pdf.svg" width="19" height="19" alt="Download PDF"></button>' + 
            "</a>");
      }
      $("#searchTxt").on('keyup',function(e) {
        e.preventDefault();
        if (e.keyCode === 13) {
          $('#forsea').trigger('click');
        } 
      }); 
      $("#goSearch").on('click',function(e) {
        e.preventDefault();
          $('#forsea').trigger('click');
      });

      $(".trail_download").bind('click', this.trailuser_check );
    },

    search: function(e) {

      SEARCH_FOR=$("#searchTxt").val();
      this.$el.children().remove();
      if (!PDFJS.PDFViewer || !PDFJS.getDocument) {
         console.log("PDFJS Not loaded");

      }
      var pageUrl = $('#rendersec').attr('href');
     
      PDFJS.workerSrc = 'plugins/pdfjs-dist/build/pdf.worker.js';
      var container = document.getElementById("canvas");
      var d = document.createElement("div");
      d.id ="viewer";
      d.className = "pdfViewer";
      container.appendChild(d);
      this.$el.append('<div id="forsea"></div>');
      var pdfLinkService = new PDFJS.PDFLinkService();
      var pdfViewer = new PDFJS.PDFViewer({
          container: container,
          linkService: pdfLinkService,
      });
      pdfLinkService.setViewer(pdfViewer);
      
      // find controller.
      var pdfFindController = new PDFJS.PDFFindController({
          pdfViewer: pdfViewer
      });
      
      pdfViewer.setFindController(pdfFindController);
      container.addEventListener('pagesinit', function () {
        // We can use pdfViewer now, e.g. let's change default scale.
        pdfViewer.currentScaleValue = 'page-width';

        if (SEARCH_FOR) { // We can try search for things
          pdfFindController.executeCommand('find', { 
          caseSensitive: false, 
          findPrevious: undefined,
          highlightAll: true, 
          phraseSearch: true, 
          query: SEARCH_FOR});
        }    
      });

      PDFJS.getDocument(pageUrl).then(function (pdfDocument) {
        // Document loaded, specifying document for the viewer and
        // the (optional) linkService.
            pdfViewer.setDocument(pdfDocument);
            pdfLinkService.setDocument(pdfDocument, null);
      });  
  },

  trailuser_check: function(e){
      console.log("print the trailuser_check in pdfview");
      e.preventDefault();
      if (app.ClientAppRouter.trail_user == true) {
        console.log("print the trailuser_check in pdfview");
        alert("Download option is currently not available under free trial. Please contact info@zurikglobal.com");                 
      } 
  }

  	
});
