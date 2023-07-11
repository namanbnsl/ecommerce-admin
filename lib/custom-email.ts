import { Theme } from 'next-auth';
import { SendVerificationRequestParams } from 'next-auth/providers';
import { createTransport } from 'nodemailer';

export async function sendVerificationRequest(
  params: SendVerificationRequestParams
) {
  const { identifier, url, provider, theme } = params;
  const { host } = new URL(url);

  const transport = createTransport(provider.server);

  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host, theme })
  });
  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
  }
}

function html(params: { url: string; host: string; theme: Theme }) {
  const { url } = params;

  return `
  <body style="background: #020817; font-family: Poppins;">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;600&display=swap" rel="stylesheet">
  
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: #020817; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; color: #fff;">
          Sign in to <strong>ecommerce-admin</strong>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 10px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="#fff"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; color: #020817; text-decoration: none; border-radius: 155px; padding: 10px 40px; border: 1px solid #fff; display: inline-block; font-weight: bold;">Sign
                  in</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; color: #fff;">
          If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
`;
}

/** Email Text body (fallback for email clients that don't render HTML, e.g. feature phones) */
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
