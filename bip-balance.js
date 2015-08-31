var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/saldo/:card/:rut', function(req, res){
    
    var requestData = {
        "uri" : "http://pocae.tstgo.cl/PortalCAE-WAR-MODULE/SesionPortalServlet",
        "form": {
          "accion": 6,
          "NumDistribuidor": 99,
          "NomUsuario": "usuInternet",
          "NomHost": "AFT",
          "NomDominio": "aft.cl",
          "Trx": "",
          "RutUsuario": req.params.rut,
          "NumTarjeta": req.params.card,
          "bloqueable": "0"
        }
    }

    request.post(requestData, function(error, response, html){

        if(!error){
          var $ = cheerio.load(html);

          var title, release, rating;
          var json = {}

          $('table:nth-child(5)').filter(function(){
            var data = $(this).children().first().text().replace(/\t\t+/g,'').replace(/\r\r+/g,'').split('\n');
            console.log(data[14].trim().length)
            var json = {};
            
            json.balance = data[14].trim();
            json.card_number = data[6].trim();

            if (data[14].trim().length > 0) {
              json.card_status = data[8].trim();
              json.last_activity = data[16].trim();
            } else {
              json.card_status = "No hay información";
              json.last_activity = "No hay información";
            }
            res.send(json);
          });
        } else {
          res.send(error);
        }
    })
})

app.listen('6001')
console.log('Magic happens on port 6001');
exports = module.exports = app;