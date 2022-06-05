function createActivationUserMail(link) {
  return `
  <div>
    <h2>Hello! To activate follow the link</h2>
    <a href="${link}">${link}</a>
    <h4>If this is not your letter, then ignore it.</h4>
  </div>
  `;
}

function createResetPasswordMail(link) {
  return `
  <div>
  <h2>Hello! To reset password follow the link</h2>
  <a href="${link}">${link}</a>
  <h4>If this is not your letter, then ignore it.</h4>
  </div>
  `;
}

function createAlertMail(appeal, text) {
  return ``;
}

export { createActivationUserMail, createResetPasswordMail, createAlertMail };
