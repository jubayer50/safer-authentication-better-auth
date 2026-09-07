import LoginOTPForm from "@/app/Component/Auth/LoginOTPForm/LoginOTPForm";

const VerifyLoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen px-3">
      <LoginOTPForm email={"jubayer0@gmail.com"}></LoginOTPForm>
    </div>
  );
};

export default VerifyLoginPage;
