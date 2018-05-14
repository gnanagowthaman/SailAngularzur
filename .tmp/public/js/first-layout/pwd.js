  $(document).ready(function() {
    $('#psdSubmit').on('click',function(e) {
      e.preventDefault();
      var password = $("#txtPassword").val();
      var confirmPassword = $("#txtConfirmPassword").val();
      if (password !== confirmPassword) {
       // alert("Passwords do not match."); 
        $('#psw1_error').html("Passwords do not match.");
           $('#txtPassword').on('click',function(e){
                e.preventDefault();
              $('#psw1_error').html("");
                $('#txtPassword').val("");
              $('#txtConfirmPassword').val("");
           });
        return false;
      }  
      if((password.length > 10 || password.length < 6) && (confirmPassword.length > 10 || confirmPassword.length < 6)) {
      // alert("make sure the password is between 6-10 characters long");
          $('#psw1_error').html("make sure the password is between 6-10 characters long.");
          $('#txtPassword').click(function(e){
                e.preventDefault();
              $('#psw1_error').html("");
              $('#txtPassword').empty();
                $('#txtConfirmPassword').empty();
           });
        return false;       
      }
      $( "#targetform" ).submit();
    });
  });   