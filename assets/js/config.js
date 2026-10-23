// Site settings. Fill these in when the form services are set up (see README.md).
// Leave an endpoint empty and the matching form will say it is not live yet,
// so no guest is ever told a submission worked when it did not.
window.SITE = {
  // Mailchimp: paste the "action" URL from your audience's embedded signup form, e.g.
  // https://yourname.us21.list-manage.com/subscribe/post?u=XXXX&id=YYYY&f_id=ZZZZ
  // Emails entered on the welcome screen are added to that audience.
  mailchimpAction: "",
  // Optional fallback: any endpoint that accepts JSON { email, lang, page }. Used only if mailchimpAction is empty.
  emailEndpoint: "",
  // Receives RSVP submissions (JSON with all RSVP fields).
  rsvpEndpoint: "",
  // Bump this to show the welcome screen again to everyone (e.g. after changing wording).
  gateVersion: "1"
};
