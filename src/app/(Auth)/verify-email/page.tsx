import EmailVerifyForm from "@/app/Component/Auth/EmailVerifyForm";

type VerifyEmailProps = { searchParams: Promise<{ email?: string }> };

const VerifyEmailPage = async ({ searchParams }: VerifyEmailProps) => {
  const params = await searchParams;

  const email = params.email ?? "";

  return (
    <div className="h-screen flex items-center justify-center p-3">
      <EmailVerifyForm email={email}></EmailVerifyForm>
    </div>
  );
};

export default VerifyEmailPage;
