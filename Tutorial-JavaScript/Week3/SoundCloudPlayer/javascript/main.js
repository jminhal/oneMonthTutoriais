
//Ir buscar o texto
function getText(){
  document.querySelector('input').addEventListener("change",function () {
    var text = document.getElementById('userText').value;
    SoundCloudAPI.getTrack(""+text+"");
  });
}


function clickou(){
  getText();
}



document.querySelector('input').addEventListener('keypress', function (e) {
  if (e.keyCode == 13) {
    getText();
  }
});


// connectar à api
var SoundCloudAPI={};
SoundCloudAPI.init=function(){
  SC.initialize({
    client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
  });
}
SoundCloudAPI.init();

SoundCloudAPI.getTrack=function(inputValue){
  // find all sounds of buskers licensed under 'creative commons share alike'
  SC.get('/tracks', {
    q: inputValue
  }).then(function(tracks) {
    SoundCloudAPI.renderTracks(tracks);
  });
}

SoundCloudAPI.renderTracks=function(tracks){
  var searchResults=document.querySelector('.js-search-results');
   searchResults.innerHTML="";

  tracks.forEach(function(track){
    //card
    var card=document.createElement('div');
    card.classList.add('card');

    //image
    var imageDiv=document.createElement('div');
    imageDiv.classList.add('image');
    var image_img=document.createElement('img');
    image_img.classList.add('image_img');
    image_img.src=track.artwork_url;
    imageDiv.appendChild(image_img);


    //content
    var content=document.createElement('div');
    content.classList.add('content');
      //header
    var header=document.createElement('div');
    header.classList.add('header');
    header.innerHTML='<a href="'+track.permalink_url+'" target="_blank">"'+track.title+'"</a>';
    //button
    var button=document.createElement('div');
    button.classList.add('ui','bottom','attached','button','js-button');
    //icon
    var icon=document.createElement('i');
    icon.classList.add('add', 'icon');
    //buttonText
    var buttonText=document.createElement('span');
    buttonText.innerHTML='Add to playlist';

    card.appendChild(imageDiv);
    content.appendChild(header);
    button.appendChild(icon);
    button.appendChild(buttonText);
    button.addEventListener('click',function(){
      console.log(track.permalink_url);
      SoundCloudAPI.getEmbed(track.permalink_url);
    });

    card.appendChild(content);

    card.appendChild(button);
    searchResults.appendChild(card);
  });
}

SoundCloudAPI.getEmbed=function(trackURL){
  SC.oEmbed(trackURL, {
    auto_play: true
  }).then(function(embed){
    var  sideBar =document.querySelector('.js-playlist');
    var box=document.createElement("div");
    box.innerHTML=embed.html;
    sideBar.insertBefore(box, sideBar.firstChild);
    localStorage.setItem("key",sideBar.innerHTML);

  });
}
var  sideBar =document.querySelector('.js-playlist');
sideBar.innerHTML=localStorage.getItem("key");

function clearPlaylist(){
    localStorage.clear();
    var  sideBar =document.querySelector('.js-playlist');
    sideBar.innerHTML="";
}
