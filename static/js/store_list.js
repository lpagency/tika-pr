/*global $*/
/*exports formFastEdit*/
"use strict";

$(document).on('pjax:end ready', function() {
    // $('#fastedit-textarea').wysihtml5({
    //     "font-styles": false, //Font styling, e.g. h1, h2, etc. Default true
    //     "emphasis": true, //Italics, bold, etc. Default true
    //     "lists": true, //(Un)ordered lists, e.g. Bullets, Numbers. Default true
    //     "html": false, //Button which allows you to edit the generated HTML. Default false
    //     "link": false, //Button to insert a link. Default true
    //     "image": false, //Button to insert an image. Default true,
    //     "color": false, //Button to change color of font
    //     "locale": "es"
    // });

    var base_url = 'https://apibodegas.loadingplay.com/store/pagination/',
    checkout_url = 'https://pay.loadingplay.com/';
    var app_public = 'tika';

    function isLocalHost() {
        return document.location.href.indexOf('localhost') != -1;
    }

    function isDevelopment() {
        return document.location.href.indexOf('ondev.today') != -1;
    }

    // configure for each enviroment
    if ( isLocalHost() )
    {
        // base_url = 'https://apibodegas.loadingplay.com/store/pagination/';
        // checkout_url = 'https://pay.loadingplay.com/';
        // app_public = 'tika';
        base_url = 'http://localhost:8520/store/pagination/';
        checkout_url = 'http://localhost:8522/';
        app_public= 'tika';
    }
    else if ( isDevelopment() )
    {
        base_url = 'https://apibodegas.loadingplay.com/store/pagination/';
        checkout_url = 'https://pay.loadingplay.com/';
        app_public = 'tika';
    }

    if (!$.fn.dataTable.isDataTable('#stores')) {
        var stores_table = $('#stores').DataTable({
                "order": [
                [0, "asc"]
                ],
                "serverSide": true,
                "processing": true,
                "ajax": {
                    url: base_url+app_public,
                    type: "post",
                    data: function(d) {
                        //d.start = d.start
                    }
                },
                "lengthChange": true,
                "pageLength": 20,
                "dom": 'T<"clear">lfrtip',
                "tableTools": {
                    "sSwfPath": "../static/swf/copy_csv_xls_pdf.swf",
                    "aButtons": [{
                        "sExtends": "copy",
                        "sButtonText": "Copiar",
                        fnComplete: function(nButton, oConfig, flash, text) {
                            var lines = text.split('\n').length;
                            if (oConfig.bHeader) lines--;
                            if (this.s.dt.nTFoot !== null && oConfig.bFooter) lines--;
                            var plural = (lines == 1) ? "" : "s";
                            this.fnInfo('<h6>Tabla copiada</h6>' + '<p>' + lines + ' fila' + plural + ' copiada' + plural + ' al portapapeles.</p>', 1500);
                        }
                    }, "xls", {
                        "sExtends": "pdf",
                        "sButtonText": "PDF"
                    }, {
                        "sExtends": "print",
                        "sButtonText": "Imprimir",
                        fnClick: function() {
                            window.print();
                        }
                    }]
                },
                "columnDefs": [{
                    "targets" : 0,
                    "data" : "country",
                    "orderable" : true,
                    "width": "40px"
                }, {
                    "targets": 1,
                    "data": "name",
                    "orderable": true
                }, {
                    "targets": 2,
                    "data": "city",
                    "orderable": true
                }],
                "lengthMenu": [[ 10, 25, 50, 100, 200, 300, 400, 500, -1 ],[ 10, 25, 50, 100, 200, 300, 400, 500, "Todos" ]],
                "language": {
                    "zeroRecords": "No hay resultados para esta busqueda",
                    "search": "B&uacute;squeda:",
                    "paginate": {
                        "first": "Primera",
                        "last": "&Uacute;ltima",
                        "next": "Siguiente",
                        "previous": "Anterior"
                    },
                    "info": "Mostrando _START_ a _END_ de _TOTAL_ entradas",
                    "infoEmpty": "Mostrando 0 a 0 de 0 entradas",
                    "processing": "Cargando...",
                    "lengthMenu": "Mostrando _MENU_ entradas"
                }
            });
        stores_table.on( 'draw', function ( e, settings, json ) {
            $('table').trigger('footable_resize');
            console.log("resize");
        });
        }

    });
