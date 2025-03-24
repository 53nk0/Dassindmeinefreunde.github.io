// EmailJS initialisieren
(function () {
    emailjs.init("vF8mel5g7m5rtktJh");
})();

document.addEventListener("DOMContentLoaded", function() {
    // Add click event listeners to all member cards
    const memberCards = document.querySelectorAll('.member');
    memberCards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const description = this.getAttribute('data-description');
            const details = this.getAttribute('data-details');
            
            // Populate the overlay with member data
            document.getElementById('overlay-name').textContent = name;
            document.getElementById('overlay-description').textContent = description;
            document.getElementById('overlay-details').textContent = details;
            
            // Füge Bearbeitungsbutton hinzu
            const editButton = document.getElementById('edit-profile-button');
            editButton.setAttribute('data-member', name);
            
            // Show the overlay
            document.getElementById('overlay').style.display = "flex";
            document.getElementById('overlay').classList.add("show");
        });
    });

    // Steckbrief-Formular Event-Listener
    const profileForm = document.getElementById("profile-form");
    profileForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const memberName = document.getElementById("profile-member-name").value;
        const age = document.getElementById("profile-age").value;
        const birthday = document.getElementById("profile-birthday").value;
        const hobbies = document.getElementById("profile-hobbies").value;
        const friendship = document.getElementById("profile-friendship").value;
        const memories = document.getElementById("profile-memories").value;
        
        // Speichere die Daten im localStorage (als einfache Lösung)
        const profileData = {
            age,
            birthday,
            hobbies,
            friendship,
            memories
        };
        
        localStorage.setItem(`profile-${memberName}`, JSON.stringify(profileData));
        
        // Schließe das Steckbrief-Formular
        hideProfileEditor();
        
        // Aktualisiere die Anzeige mit den neuen Daten
        showProfileData(memberName);
        
        // Bestätigungsmeldung
        alert(`Steckbrief für ${memberName} wurde gespeichert!`);
    });
    
    // Edit-Button Event-Listener
    document.getElementById("edit-profile-button").addEventListener("click", function() {
        const memberName = this.getAttribute('data-member');
        showProfileEditor(memberName);
    });
    
    // Contact form submission
    const contactForm = document.getElementById("contact-form");
    const feedback = document.getElementById("feedback");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // EmailJS senden
        emailjs.send("service_039go05", "template_hk80ui5", {
            name: name,
            email: email,
            message: message,
        }).then(
            function (response) {
                feedback.classList.remove("hidden");
                feedback.classList.add("show");
                contactForm.reset();
            },
            function (error) {
                console.error("Fehler beim Senden der E-Mail:", error);
                alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
            }
        );
    });
});

// Overlay-Funktionen
function showOverlay() {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("overlay").classList.add("show");
}

function hideOverlay() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("overlay").classList.remove("show");
}

// Schließen der Overlays
function hideProfileEditor() {
    document.getElementById("profile-editor").style.display = "none";
    document.getElementById("profile-editor").classList.remove("show");
}

function hideProfileViewer() {
    document.getElementById("profile-viewer").style.display = "none";
    document.getElementById("profile-viewer").classList.remove("show");
}

function showProfileEditor(memberName) {
    // Setze den Namen des Members
    document.getElementById("profile-member-name").value = memberName;
    document.getElementById("profile-editor-title").textContent = `Steckbrief für ${memberName} erstellen`;
    
    // Fülle das Formular mit vorhandenen Daten, falls vorhanden
    const savedData = localStorage.getItem(`profile-${memberName}`);
    const profileForm = document.getElementById("profile-form");
    
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById("profile-age").value = data.age || '';
        document.getElementById("profile-birthday").value = data.birthday || '';
        document.getElementById("profile-hobbies").value = data.hobbies || '';
        document.getElementById("profile-friendship").value = data.friendship || '';
        document.getElementById("profile-memories").value = data.memories || '';
    } else {
        // Leere das Formular, falls keine Daten vorhanden
        profileForm.reset();
    }
    
    // Zeige den Steckbrief-Editor
    document.getElementById("profile-editor").style.display = "flex";
    document.getElementById("profile-editor").classList.add("show");
}

function showProfileData(memberName) {
    const savedData = localStorage.getItem(`profile-${memberName}`);
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Setze die Daten im Profil-Viewer
        document.getElementById("profile-view-name").textContent = memberName;
        document.getElementById("profile-view-age").textContent = data.age || 'Nicht angegeben';
        document.getElementById("profile-view-birthday").textContent = data.birthday || 'Nicht angegeben';
        document.getElementById("profile-view-hobbies").textContent = data.hobbies || 'Nicht angegeben';
        document.getElementById("profile-view-friendship").textContent = data.friendship || 'Nicht angegeben';
        document.getElementById("profile-view-memories").textContent = data.memories || 'Nicht angegeben';
        
        // Zeige den Profil-Viewer
        document.getElementById("profile-viewer").style.display = "flex";
        document.getElementById("profile-viewer").classList.add("show");
    } else {
        alert(`Es gibt noch keinen Steckbrief für ${memberName}. Erstelle jetzt einen!`);
        showProfileEditor(memberName);
    }
}

// Event-Listener für ESC-Taste
document.addEventListener('keydown', function(event) {
    // Prüfen, ob die ESC-Taste gedrückt wurde
    if (event.key === "Escape") {
        // Alle Overlays schließen
        hideOverlay();
        hideProfileEditor();
        hideProfileViewer();
    }
});

// Navbar-Scrolling-Effekt
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});