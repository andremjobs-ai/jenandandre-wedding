// Site settings. Fill these in when the form services are set up (see README.md).
// Leave an endpoint empty and the matching form will say it is not live yet,
// so no guest is ever told a submission worked when it did not.
window.SITE = {
  // Receives the email entered on the welcome screen (JSON: { email, lang, page }).
  emailEndpoint: "",
  // Receives RSVP submissions (JSON with all RSVP fields).
  rsvpEndpoint: "",
  // Bump this to show the welcome screen again to everyone (e.g. after changing wording).
  gateVersion: "1"
};
