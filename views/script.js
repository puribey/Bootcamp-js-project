$(document).ready(function(){

 load_json_data('Categoria');

 function load_json_data(id, parent_id)
 {
  var html_code = '';
  $.getJSON('items.json', function(data){

   html_code += '<option value="">Seleccione '+id+'</option>';
   $.each(data, function(key, value){
    if(id == 'Categoria')
    {
     if(value.parent_id == '0')
     {
      html_code += '<option value="'+value.id+'">'+value.name+'</option>';
     }
    }
    else
    {
     if(value.parent_id == parent_id)
     {
      html_code += '<option value="'+value.id+'">'+value.name+'</option>';
     }
    }
   });
   $('#'+id).html(html_code);
  });

 }

 $(document).on('change', '#Categoria', function(){
  var categoria_id = $(this).val();
  console.log(categoria_id);
  if(categoria_id != '')
  {
   load_json_data('Subcategoria', categoria_id);
   $('#Subcategoria').on('change',function(){
      var subcat = $(this).val();
      var json_html = '';
      console.log(subcat);
      $.getJSON('tv.json', function(data){
        console.log(data);
          $.each(data, function(key, value){
          if (subcat == '5'){
            json_html += '<div class="flex">';
            json_html += '<img width="300px" src="'+value.foto+'"/>';
            json_html += '<div>';
            json_html += '<h2>'+value.name+'</h2>';
            json_html += '<p>'+value.descripcion+'</p>'
            json_html += '<button>Detail</button>'    
            json_html += '</div>';            
            json_html += '</div>';
            $('#tv-container').append(json_html);
          } 
        });
      });

      $.getJSON('notebooks.json', function(data){
        console.log(data);
          $.each(data, function(key, value){
          if (subcat == '6'){
            json_html += '<div class="flex">';
            json_html += '<img width="300px" src="'+value.foto+'"/>';
            json_html += '<div>';
            json_html += '<h2>'+value.name+'</h2>';
            json_html += '<p>'+value.descripcion+'</p>'
            json_html += '<button>Detail</button>'    
            json_html += '</div>';            
            json_html += '</div>';
            $('#notebook-container').append(json_html);
          } 
        });
      });



   });
  }
 });
});

