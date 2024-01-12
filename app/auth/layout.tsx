const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-500">
      {children}
    </div>
  );
};

export default AuthLayout;
