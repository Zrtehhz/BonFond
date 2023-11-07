document.addEventListener('DOMContentLoaded', function() {
    
document.getElementById('wallpaper-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêcher le rechargement de la page
  
    // Obtenir l'URL de l'image
    var imageUrl = document.getElementById('imageUrl').value;
  
    if (imageUrl.trim() === '') {
      alert('Veuillez coller une URL valide.');
      return;
    }
  
    // Ajouter l'image au stockage local
    var storedImages = localStorage.getItem('wallpapers');
    var imagesArray = storedImages ? JSON.parse(storedImages) : [];
    imagesArray.push(imageUrl);
    localStorage.setItem('wallpapers', JSON.stringify(imagesArray));
  
    // Ajouter l'image à la page principale
    addImageToDOM(imageUrl);
  
    // Cacher le formulaire et vider le champ
    document.getElementById('wallpaperFormContainer').style.display = 'none';
    document.getElementById('imageUrl').value = '';
  });
  
  document.getElementById('cancelButton').addEventListener('click', function() {
    document.getElementById('wallpaperFormContainer').style.display = 'none';
    document.getElementById('imageUrl').value = '';
  });
  
  function displaySavedWallpapers() {
    var storedImages = localStorage.getItem('wallpapers');
    if (storedImages) {
      var imagesArray = JSON.parse(storedImages);
      imagesArray.forEach(function(imageUrl) {
        addImageToDOM(imageUrl);
      });
    }
  }
  
  function addImageToDOM(imageUrl) {
    var imgDiv = document.createElement('div');
    imgDiv.className = 'col-md-6 wallpaper-thumbnail';
    imgDiv.innerHTML = `
      <div class="d-flex justify-content-center mb-3 position-relative">
        <img src="${imageUrl}" class="img-fluid w-75">
        <button class="btn btn-primary btn-sm position-absolute">Appliquer</button>
      </div>`;
    document.getElementById('wallpapers').appendChild(imgDiv);
  
    // Ajoutez l'écouteur d'événements sur le bouton ici
    var applyButton = imgDiv.querySelector('button');
    applyButton.onclick = function() {
      COMPONENTS.SHARE.USE_WALLPAPER(imageUrl);
      console.log('Le fond d\'écran a été défini : ' + imageUrl);
    };
  }
  
    
    // Cacher le menu contextuel si on clique en dehors
    window.addEventListener('click', function(event) {
      var contextMenu = document.getElementById('contextMenu');
      if (!contextMenu.contains(event.target)) {
        contextMenu.style.display = 'none';
      }
    });
    
  
  displaySavedWallpapers(); // Assurez-vous que cette ligne est à l'intérieur de l'événement 'DOMContentLoaded'
});

document.getElementById('addWallpaperButton').addEventListener('click', function() {
  document.getElementById('wallpaperFormContainer').style.display = 'block';
});
