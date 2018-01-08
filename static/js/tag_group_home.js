function isLocalHost() {
    return document.location.href.indexOf('localhost') != -1;
}

function isDevelopment() {
    return document.location.href.indexOf('ondev.today') != -1;
}

$(document).ready(function(){

    // detalle recetas
    $(".fancybox").fancybox({
        'width':400,
        'height':400,
        'autoSize' : false,
        'autoScale': false,
        'padding': 0,
        'helpers': {
                overlay: {
                    locked: false,
                    // css: { 
                    //     'background': 'url(https://7static.loadingplay.com/static/images/eb91172c27b8ba2f678ac75a371cf33d_BACKGROUND.png) no-repeat center center',
                    //     'background-size':'cover',
                    //     '-moz-background-size': 'cover',
                    //     '-webkit-background-size': 'cover',
                    //     '-o-background-size': 'cover'
                    //     } 
                }
            }
    });


    var base_url= "https://apibodegas.loadingplay.com/"
    // configure for each enviroment
    if ( isLocalHost() ) 
    {
        base_url="https://apibodegas.loadingplay.com/";
    } 
    else if ( isDevelopment() ) 
    {
        base_url="https://apibodegas.loadingplay.com/";
    }


    // listado productos
    var config = {
        'app_public' : 9,
        'base_url' : base_url,
        'maxProducts' : 6,
        'templateOrigin' : '#product-box',
        'tag' : 'tikas%20home',
        'ignore_stock' : true,
        'onLoad':function(){
            $('.ellipsis').ellipsis();
        }
    };

    $('.tika-home').ecommerce('product_box', config);

    // change config
    config.templateOrigin = '#recipe-box';
    config.tag = 'recipe%20home';

    $('.recipe-home').ecommerce('product_box', config);
});
