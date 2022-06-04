function createActivationUserMail(appeal, link) {
  return `
  <div>
    <h2>Hello, ${appeal}. To activate follow the link</h2>
    <a style="font-family: Consolas, 'Courier New', monospace; text-decoration: none; appearance: button;cursor:pointer;" href="${link}">activate</a>
    <h4>If this is not your letter, then ignore it.</h4>
  </div>
  `;
}

function createResetPasswordMail(appeal, link) {
  return ``;
}

function createAlertMail(appeal, text) {
  return ``;
}

export { createActivationUserMail, createResetPasswordMail, createAlertMail };
