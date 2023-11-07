document.addEventListener('DOMContentLoaded', function() {
  displaySavedWallpapers(); // Assurez-vous que cette ligne est à l'intérieur de l'événement 'DOMContentLoaded'
});

document.getElementById('addWallpaperButton').addEventListener('click', function() {
  // Afficher le formulaire
  document.getElementById('wallpaperFormContainer').style.display = 'block';
});

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
      <div class="d-flex justify-content-center mb-3">
        <img src="${imageUrl}" class="img-fluid">
      </div>`;
    var imgElement = imgDiv.querySelector('img');
    imgElement.addEventListener('click', function(event) {
      // Afficher le menu contextuel à la position de la souris
      var contextMenu = document.getElementById('contextMenu');
      contextMenu.style.left = `${event.pageX}px`;
      contextMenu.style.top = `${event.pageY}px`;
      contextMenu.style.display = 'block';
  
      // Définir l'image actuelle comme cible pour le fond d'écran
      document.getElementById('useAsWallpaper').addEventListener('click', function() {
        // Ici, déclenchez l'événement ou appelez la fonction pour utiliser l'image comme fond d'écran
        // Par exemple : COMPONENTS.SHARE.USE_WALLPAPER(imageUrl);
        contextMenu.style.display = 'none'; // Cacher le menu après la sélection
      }, { once: true }); // Utilisez l'option { once: true } pour que l'événement soit écouté une seule fois
    });
    document.getElementById('wallpapers').appendChild(imgDiv);
  }
  
  // Cacher le menu contextuel si on clique en dehors
  window.addEventListener('click', function(event) {
    var contextMenu = document.getElementById('contextMenu');
    if (!contextMenu.contains(event.target)) {
      contextMenu.style.display = 'none';
    }
  });
  
