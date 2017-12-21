var categorias = ["Libros","Comics","Mangas"];
var libros = ["Seleccionar subcategoría","Harry Potter","El señor de los anillos","Percy Jackson"];
var comics = ["Seleccionar subcategoría","Marvel","DC"];
var manga = ["Seleccionar subcategoría","Shonen","Shojo"];


$(document).ready(function(){
    selectCategoria(); 
    cargarProductos();
  $('#categoria').on('change', function(){
    $('#subcat').html('');
    var valCat = $('#categoria').val();
    console.log(valCat);
    if(valCat == "Libros"){
      cargoSubcats(libros);
    } else if (valCat == "Comics"){
      cargoSubcats(comics);
    } else if (valCat == "Mangas"){
      cargoSubcats(manga);
    } else {
      $('#subcat').css({display:'none'});
    }
  });
  $('#subcat').on('change', function(){
    var valSub = $('#subcat').val();
    console.log(valSub);
    buscarProductos(valSub);
  });
  $(document).on('click','.btn',function(){
    var ids = $(this).attr('id');
    cargoModal(ids);
  });
    //$('#s2').on('change', function(event){
      //$('div .img').not('batman').css({display:'none'});
    //});
    //$(document).on('click','#btn', function)// para el modal con detalle de producto
});

function cargarProductos(){
  $.getJSON('items.json', function(data){
    $.each(data,function(key,value){
      var a = '<button id="'+value.id+'" class="relative btn" data-toggle="modal" data-target="#myModal"><img src="'+value.src+'" class="img-responsive img myImg"><p>'+value.name+'</p></button>';
      $('#item-container').append(a);
    });
  });
}

function buscarProductos(valSub){
  $('#item-container').html('');
  $.getJSON('items.json', function(data){
    $.each(data,function(key,value){
      if(valSub == value.subcat){
        var a = '<button id="'+value.id+'" class="relative btn" data-toggle="modal" data-target="#myModal"><img src="'+value.src+'" class="img-responsive img myImg"><p>'+value.name+'</p></button>';
        $('#item-container').append(a);
      } 
    });
  });
}


function selectCategoria(){ 
for(var i =0; i< categorias.length; i++){
      console.log(categorias);
      var option = '<option value="'+categorias[i]+'">'+categorias[i]+'</option>';
      $('#categoria').append(option);
      console.log(option);
    }
}

function cargoSubcats(subcats){
  $('#subcat').css({display:'block'});
  $.each(subcats, function(i, value){
    var y = '<option >'+value+'</option>'
    $('#subcat').append(y);
  });
}


function cargoModal(ids){
 $.getJSON('items.json', function(data){
  $('#myModal').html('');
    $.each(data,function(key,value){
      if(ids == value.id){
      var modal = '<div class="modal-dialog">'+
         '<div class="modal-content">'+
           '<div class="modal-header">'+
             '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
             '<h2 class="modal-title">'+value.name+'</h2>'+
           '</div>'+
          '<div>'+
              '<img src="'+value.src+'" class="img-responsive"/>'+
           '</div>'+
           '<div class="modal-body">'+
             '<p>'+value.descripcion+'</p>'+
             '<h3 class="modal-title"> Precio: '+value.precio+'</h3>'+
           '</div>'+
           '<div class="modal-footer">'+
             '<button type="button" class="btn btn-success" data-dismiss="modal">Comprar</button>'+
           '</div>'+
         '</div>'+
       '</div>';
      $('.myModal').append(modal);
      }
    });
 });
}
