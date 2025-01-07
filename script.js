// EmailJS initialisieren
(function () {
    emailjs.init("vF8mel5g7m5rtktJh"); // User-ID hier einsetzen
})();

const contactForm = document.getElementById("contact-form");
const feedback = document.getElementById("feedback");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();  // Verhindert das Standardverhalten und das URL-Ändern

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
            feedback.classList.add("show");
            feedback.textContent = "Vielen Dank für Ihre Nachricht!";
            contactForm.reset();
        },
        function (error) {
            console.error("Fehler beim Senden der E-Mail:", error);
            alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
        }
    );
});
function openExtendedInfo(friend) {
    const nameElement = document.getElementById("extended-name");
    const descriptionElement = document.getElementById("extended-description");

    const extendedInfo = {
        "Mathieu": {
            name: "Mathieu",
            description: "Mathieu ist wie ein zweiter Bruder für mich, ohne ihn hätte ich sache gemacht die ich nicht machen soll. Mit ihm habe ich aufgehört dummheiten zu machen. "
            ,details: "Getroffen haben wir uns wenn ich mit einem Kollegen names Mihajlo war. Er hat Mathieu eingeladen und seitdem sind wir ein Duo."
        },
        "Eldin": {
            name: "Eldin",
            description: "Eldin ist mein Cousin, aber auch mein bester Kollege. Wir sind durch dick und dünn gegangen.",
            details: "Name: Eldin Alter 14 Jahre Nationalität: Deutsch / Bosner "
        },
        "Tino": {
            name: "Tino",
            description: "Tino kenne ich seit fast einem Jahr, und seit letztem Neujahr sind wir enge Freunde geworden. Wir beide finden das wir sehr gute Kollegen sind.",
            details: "Wir haben uns am 30.12.23 besser kennengelernt und haben seit dem Kontakt und sind beste Freunde"
        },
        "Emil": {
            name: "Emil",
            description: "Emil ist ebenfalls mein Cousin und ein enger Freund. Wir haben viele gemeinsame Erinnerungen.",
            details: "Früher hassten wir uns obwohl wir cousengs wahren. Wir haben jedes mal wenn wir uns gesehen haben und entweder geschlagen oder nur beleidigt. Jetzt sind wir auch unzertrennlich."
        },
        "Mohamed": {
            name: "Mohamed",
            description: "Mohamed ist wie ein Bruder für mich. Wir haben viel zusammen durchgestanden und uns gegenseitig unterstützt.",
            details: "Ich habe ihm geholfen bei schwierigen Zeiten er mir. Er weiss eigentlich alles von mir und ich alles von ihm."
        },
        "Filip": {
            name: "Filip",
            description: "Filip und ich sind seit kurzem beste Freunde, obwohl ich ihn schon aus der Kindheit kenne.",
            details: "Erlebnisse aus der Vergangenheit und gemeinsame Erlebnisse in der Gegenwart, die unsere Freundschaft vertieft haben."
        },
        "Janik": {
            name: "Janik",
            description: "Janik kenne ich seit ein paar Monaten. Wir haben immer eine tolle Zeit und lachen viel zusammen.",
            details: "Besondere Geschichten über gemeinsame Erlebnisse, die uns nähergebracht haben und das Lachen, das wir teilen."
        }
    };

    // Setze die erweiterten Informationen
    nameElement.textContent = extendedInfo[friend].name;
    descriptionElement.textContent = extendedInfo[friend].description + " " + extendedInfo[friend].details;

    // Erweiterte Info anzeigen
    document.getElementById("extended-info").classList.remove("hidden");
}

function closeExtendedInfo() {
    // Erweiterte Info ausblenden
    document.getElementById("extended-info").classList.add("hidden");
}

// Event Listener für "ESC"-Taste hinzufügen
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeExtendedInfo();
    }
});
