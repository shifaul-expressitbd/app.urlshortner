import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>
      </div>
      <div className="hidden bg-muted lg:block border-l">
        <div className="flex h-full flex-col justify-center items-center p-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Enterprise Link Management</h1>
            <p className="text-muted-foreground text-lg">
                Secure, scalable, and powerful URL shortening for modern teams.
            </p>
        </div>
      </div>
    </div>
  );
}
