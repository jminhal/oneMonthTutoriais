function getText(){
  let getUserText=document.getElementById("text").value;
  giphyAPI(getUserText);
}

function giphyAPI(input){
  var userSearch=input;
  var url = "http://api.giphy.com/v1/gifs/search?q="+userSearch+"t&api_key=dc6zaTOxFJmzC";
  // AJAX Request
  var GiphyAJAXCall = new XMLHttpRequest();
  GiphyAJAXCall.open( 'GET', url );
  GiphyAJAXCall.send();

  GiphyAJAXCall.addEventListener('load',function(e){

    var data = e.target.response;
      displayGifs(data);
  });

}

function displayGifs(inputData){
  var response = JSON.parse(inputData);
    var imageUrls = response.data;
    var container = document.querySelector(".js-container");
    container.innerHTML="";
    imageUrls.forEach(function(image){
      var src = image.images.fixed_height.url;
      container.innerHTML += "<img src=\"" + src + "\" class=\"container-image\">";
    });
}




  function clickou(){
    getText();
  }

  document.querySelector(".js-userinput").addEventListener('keyup',function(e){

    var input = document.querySelector("input").value;

    // if the key ENTER is pressed...
    if(e.which === 13) {
      getText();
    }

  });
