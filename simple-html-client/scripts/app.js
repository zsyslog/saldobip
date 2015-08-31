jQuery(document).ready(function() {
    
    $('.login-form input[type="text"]').on('focus', function() {
        $(this).removeClass('input-error');
    });
    
    $('#form-rut').Rut({
        on_error: function(){ 
            alert('Verifique que el RUT ingresado es correcto, por favor');
            $('#form-rut').val('');
        }
    });

    $('.balance-form').on('submit', function(e) {
        
        $(this).find('input[type="text"]').each(function(){

            if( $(this).val() == "" ) {
                e.preventDefault();
                $(this).addClass('input-error');
            } else {
                $(this).removeClass('input-error');
            }

            var rut = $('#form-rut').val();
            var card = $('#form-card').val();

            if (card!='' && rut!=''){
                $('.spinner').removeClass('hide');
                var url = "http://bip.apps.zsyslog.com/saldo/" + card + "/" + rut;
                $.ajax({
                    url: url,
                    method: "GET",
                    success: function(data){
                        $('.result-data').removeClass('hide');
                        $('.card-balance .value').text(data.balance);
                        $('.card-status .value').text(data.card_status);
                        $('.card-activity .value').text(data.last_activity);
                        $('.spinner').addClass('hide');
                        $('fa-credit-card').trigger('click');
                    },
                    error: function(e){
                        console.log(e);
                    }
                })
            }

            

        });

        return false;
        
    });
    
    
});