// Fonction pour ajouter une image au DOM
function addImageToDOM(imageUrl) {
    var imgDiv = document.createElement('div');
    imgDiv.className = 'wallpaper-thumbnail';
    imgDiv.innerHTML = `
      <div class="d-flex justify-content-center mb-3">
        <img src="${imageUrl}" class="img-fluid w-75 h-75 ">
      </div>`;
    imgDiv.addEventListener('click', function() {
      openWallpaperPopup(imageUrl);
    });
    document.getElementById('wallpapers').appendChild(imgDiv);
  }
  
  // Fonction pour ouvrir une pop-up avec des options pour annuler ou appliquer le fond d'écran
  function openWallpaperPopup(imageSrc) {
    // Créer les éléments de la pop-up
    var popup = document.createElement('div');
    popup.setAttribute('id', 'wallpaperPopup');
    var title = document.createElement('h3');
    var description = document.createElement('p');
    var cancelButton = document.createElement('button');
    var proceedButton = document.createElement('button');
  
    // Définir le contenu des éléments
    title.textContent = "Changer de fond d'écran"; // Le titre de votre pop-up
    description.textContent = "Voulez-vous définir cette image comme votre fond d'écran?"; // La description de votre pop-up
    cancelButton.textContent = "Annuler"; // Texte pour le bouton d'annulation
    proceedButton.textContent = "Appliquer"; // Texte pour le bouton de confirmation
  
    // Appliquer les styles à la pop-up
    popup.style.position = 'fixed';
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = '#fff';
    popup.style.padding = '20px';
    popup.style.zIndex = '1000';
    popup.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
  
    // Ajouter des gestionnaires d'événements pour les boutons
    cancelButton.onclick = function() {
      document.body.removeChild(popup);
    };
    proceedButton.onclick = function() {
      // Ici, vous pouvez déclencher l'événement ou la logique pour définir l'image comme fond d'écran
      console.log('Le fond d\'écran a été défini : ' + imageSrc);
      document.body.removeChild(popup);
    };
  
    // Ajouter les éléments à la pop-up
    popup.appendChild(title);
    popup.appendChild(description);
    popup.appendChild(cancelButton);
    popup.appendChild(proceedButton);
  
    // Ajouter la pop-up au corps du document
    document.body.appendChild(popup);
  }
  
  // Assurer que le DOM est chargé avant d'ajouter les gestionnaires d'événements
  document.addEventListener('DOMContentLoaded', function() {
    var wallpaperForm = document.getElementById('wallpaper-form');
    var cancelButton = document.getElementById('cancelButton');
    var wallpaperContainer = document.getElementById('wallpapers');
  
    if (wallpaperForm && cancelButton && wallpaperContainer) {
      wallpaperForm.addEventListener('submit', function(e) {
        // Votre code pour le formulaire ici...
      });
  
      cancelButton.addEventListener('click', function() {
        // Votre code pour le bouton annuler ici...
      });
    } else {
      console.error('Certains éléments du DOM ne sont pas disponibles.');
    }
  
    // Afficher les images stockées lors du chargement de la page
    var storedImages = localStorage.getItem('wallpapers');
    if (storedImages) {
      var imagesArray = JSON.parse(storedImages);
      imagesArray.forEach(addImageToDOM);
    }
  });
  