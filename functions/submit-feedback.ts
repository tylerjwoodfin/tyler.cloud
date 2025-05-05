export interface Env {
  RESEND_API_KEY: string;
  FEEDBACK_EMAIL_FROM: string;
  FEEDBACK_EMAIL_TO: string;
}

export function onRequestPost(params: { request: Request; env: Env }) {
  return new Promise(function(resolve) {
    params.request.json().then(function(data) {
      var message = data.message;
      var contact = data.contact;

      if (!message || message.length < 4) {
        resolve(new Response("Message too short", { status: 400 }));
        return;
      }

      var subject = "New Website Feedback";
      var emailBody = [
        "Message:",
        message,
        "",
        "Contact Info:",
        contact || "Not provided"
      ].join("\n").trim();

      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + params.env.RESEND_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: params.env.FEEDBACK_EMAIL_FROM,
          to: params.env.FEEDBACK_EMAIL_TO,
          subject: subject,
          text: emailBody,
        }),
      }).then(function(res) {
        if (!res.ok) {
          return res.text().then(function(error) {
            console.error("Resend error:", error);
            resolve(new Response("Failed to send email", { status: 500 }));
          });
        }
        resolve(new Response("Feedback received", { status: 200 }));
      }).catch(function(error) {
        console.error("Fetch error:", error);
        resolve(new Response("Failed to send email", { status: 500 }));
      });
    }).catch(function(error) {
      console.error("JSON parse error:", error);
      resolve(new Response("Invalid request", { status: 400 }));
    });
  });
}
