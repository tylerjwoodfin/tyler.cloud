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
      var includeResumeRequest = data.includeResumeRequest;

      if (!message || message.length < 4) {
        resolve(new Response("Message too short", { status: 400 }));
        return;
      }

      // If resume is requested but no contact info provided, return error
      if (includeResumeRequest && (!contact || contact.trim().length === 0)) {
        resolve(new Response("Contact information required for resume request", { status: 400 }));
        return;
      }

      var subject = "New Website Feedback";
      if (includeResumeRequest) {
        subject += " - Resume Request";
      }

      var emailBodyArray = [
        "Message:",
        message,
        "",
        "Contact Info:",
        contact || "Not provided"
      ];

      if (includeResumeRequest) {
        emailBodyArray.push("", "Resume Request: YES");
      }

      var emailBody = emailBodyArray.join("\n").trim();

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
