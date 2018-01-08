function isLocalHost() {
    return document.location.href.indexOf('localhost') != -1;
}

function isDevelopment() {
    return document.location.href.indexOf('ondev.today') != -1;
}


$(document).ready(function()
{
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

    var config = {
        'app_public' : 9,
        'base_url' : base_url,
        'maxProducts' : 6,
        'templateOrigin' : '#recipe-box',
        'tag' : 'dips%20recipe',
        'ignore_stock' : true,
        'onLoad':function(){
            $('.ellipsis').ellipsis();
        }
    };


    // dips recipe
    $('.dips-recipe').ecommerce('product_box', config);

    // pasta recipes
    config.tag = 'mastika%20recipes';
    $('.pasta-recipes').ecommerce('product_box', config);

    // nuts recipes
    config.tag = 'nuts%20recipes';
    $('.nuts-recipes').ecommerce('product_box', config);

    // other recipes
    config.tag = 'other%20recipes';
    $('.other-recipes').ecommerce('product_box', config);


});
