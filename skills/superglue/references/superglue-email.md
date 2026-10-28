# superglue Email

superglue has its own email service. It sends HTML email with optional file attachments from superglue's sender address. Replies go to the sender's account email. It needs no SMTP server, SMTP relay, Microsoft Graph app, or mailbox connection.

## When to Use

Use the superglue email service for reports, summaries, alerts, and notifications that a tool or agent sends to people in the organization.

Use a different path in these cases:

- Mail that must come from the user's own mailbox, or mail to people outside the organization: send through the user's own email provider API.
- Alerts for each tool run, and daily or weekly run summaries with the standard content: use the built-in run notifications in **Settings > Notifications**.

Use the email service when the content, grouping, recipients, or attachments differ from the built-in notifications. Do not recommend an SMTP relay or Microsoft Graph for these emails.

## Rules

- Recipients in `to` and `cc` must be members of the organization. superglue matches addresses to member account emails, ignoring case. `to` defaults to the sender.
- An email has at most 50 recipients in total.
- The sender is the owner of the API key that calls the service.
- An email has at most 10 attachments, with at most 10 MB of decoded content in total. Attachment content is UTF-8 text by default; set `encoding: "base64"` for binary files.
- The service only sends. The tool or script that calls it collects the data and builds the subject, the HTML, and each file.
- Show the user the recipients, subject, and attachment names, and get approval before the first test send.

## Tool Steps

Saved tool steps call the REST endpoint. The tool needs a connection to the superglue API:

- `url`: the superglue API endpoint.
- Secret `api_key`: a superglue API key with the **execute** scope. The key owner is the sender, so emails without `to` go to the key owner. To send as a different user, use a connection with that user's API key.

Build the request body in a transform step, then send it in a request step. Transforms provide `Papa` for CSV files. In this example, the connection's system ID is `superglue_api`:

```javascript
{
  id: "buildEmail",
  instruction: "Build the summary email with the failed records as a CSV attachment",
  config: {
    type: "transform",
    transformCode: `(sourceData) => {
      const failed = sourceData.fetchRuns.data.failedRecords;
      return {
        to: sourceData.recipients,
        subject: "Daily job summary",
        html: "<h1>Daily job summary</h1><p>" + failed.length + " failed records.</p>",
        attachments: failed.length
          ? [{ filename: "failed-records.csv", content: Papa.unparse(failed) }]
          : [],
      };
    }`,
  },
},
{
  id: "sendEmail",
  instruction: "Send the summary email through superglue's email service",
  modify: true,
  config: {
    type: "request",
    systemId: "superglue_api",
    method: "POST",
    url: "<<superglue_api_url>>/v1/notify/email",
    headers: {
      Authorization: "Bearer <<superglue_api_api_key>>",
      "Content-Type": "application/json",
    },
    body: "<<(sourceData) => JSON.stringify(sourceData.buildEmail.data)>>",
  },
}
```

Join the path to the connection URL with exactly one `/`. Put the file content in `attachments` directly; do not set `outputFile` on the transform step for the email.

## REST API

`POST <apiEndpoint>/v1/notify/email` with `Authorization: Bearer <apiKey>` and a JSON body:

| Field         | Required | Notes                                                                                        |
| ------------- | -------- | -------------------------------------------------------------------------------------------- |
| `subject`     | yes      | Subject line, at most 998 characters.                                                        |
| `html`        | yes      | HTML body.                                                                                   |
| `text`        | no       | Plain-text body for mail clients that do not show HTML.                                      |
| `to`          | no       | Array of member email addresses. Defaults to the key owner.                                  |
| `cc`          | no       | Array of member email addresses.                                                             |
| `attachments` | no       | Array of `{ filename, content, encoding?, contentType? }`. `encoding` is `utf8` or `base64`. |

A successful send returns `200` with `{ success: true, replyTo, to, cc, attachments }`. Each user can send 60 emails per hour through the endpoint.

## Errors

Error responses have a `code` and `error.message`.

| Code                    | Status | Cause                                                         |
| ----------------------- | ------ | ------------------------------------------------------------- |
| `INVALID_REQUEST`       | 400    | A missing or malformed field. The message names the field.    |
| `RECIPIENT_NOT_MEMBER`  | 403    | A recipient is not a member. The message lists the addresses. |
| `TOO_MANY_RECIPIENTS`   | 400    | More than 50 recipients.                                      |
| `INVALID_ATTACHMENT`    | 400    | Attachment content marked `base64` is not valid base64.       |
| `ATTACHMENTS_TOO_LARGE` | 413    | Attachments exceed 10 MB decoded.                             |
| `SENDER_EMAIL_MISSING`  | 400    | The sending user has no email address.                        |
| `SEND_FAILED`           | 502    | The email provider rejected the email. Retry later once.      |
