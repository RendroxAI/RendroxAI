console.log("email.js loaded");

function initEmailJS() {
  if (typeof emailjs === "undefined") {
    console.error("EmailJS library not loaded");
    return;
  }

  emailjs.init({
    publicKey: "f_eRTQBi9ut4ZVAcn",
  });

  const form = document.getElementById("lead-contact-form");

  if (!form) {
    console.error("Form not found");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      from_name: document.getElementById("lead-name").value,
      email: document.getElementById("lead-email").value,
      company: document.getElementById("lead-company").value,
      service: document.getElementById("lead-service").value,
      message: document.getElementById("lead-message").value,
    };

    console.log("Sending Data:", formData);

    emailjs
      .send("service_9b6vrcp", "template_esmxclg", formData)
      .then((response) => {
        console.log("SUCCESS:", response);
        alert("Email sent successfully!");
        form.reset();
      })
      .catch((error) => {
        console.error("EMAILJS ERROR:", error);
        alert("Email failed: " + (error.text || error.message || "Unknown error"));
      });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initEmailJS);
} else {
  initEmailJS();
}
