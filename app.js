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
  imgDiv.innerHTML = `<div class="d-flex justify-content-center mb-3">
                        <img src="${imageUrl}" class="img-fluid">
                      </div>`;
  document.getElementById('wallpapers').appendChild(imgDiv);
}
