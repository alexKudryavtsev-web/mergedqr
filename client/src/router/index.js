import CreateQRPage from "../pages/CreateQRPage.jsx";
import LendingPage from "../pages/LendingPage.jsx";
import LogInPage from "../pages/LogInPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import QRDetailsPage from "../pages/QRDetailsPage.jsx";
import QRListPage from "../pages/QRListPage.jsx";
import RegistrationPage from "../pages/RegistrationPage.jsx";
import ResetPasswordPage from "../pages/ResetPasswordPage.jsx";
import SetNewPasswordPage from "../pages/SetNewPasswordPage.jsx";

const PUBLIC_ROUTES = [
  { path: "/", element: <LendingPage /> },
  { path: "login", element: <LogInPage /> },
  { path: "registration", element: <RegistrationPage /> },
  { path: "reset-password", element: <ResetPasswordPage /> },
  { path: "set-new-password/:link", element: <SetNewPasswordPage /> },
];

const PRIVATE_ROUTES = [
  { path: "/", element: <ProfilePage /> },
  { path: "create", element: <CreateQRPage /> },
  { path: "qr-codes", element: <QRListPage /> },
  { path: "qr-codes/:id", element: <QRDetailsPage /> },
];

export { PUBLIC_ROUTES, PRIVATE_ROUTES };
