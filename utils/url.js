import config from "config";

function calculateUserActivationURL(link) {
  return `${config.get("API_URL")}/user/activate-user/${link}`;
}

function calculateResetPasswordURL(link) {
  return `${config.get("CLIENT_URL")}/user/reset-password/${link}`;
}

export { calculateUserActivationURL, calculateResetPasswordURL };
