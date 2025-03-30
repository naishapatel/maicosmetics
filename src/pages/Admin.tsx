
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '@supabase/auth-helpers-react';
import NewsletterAdmin from '@/components/admin/NewsletterAdmin';

const Admin = () => {
  const session = useSession();

  // Redirect to login if not authenticated
  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="container max-w-6xl py-12">
      <h1 className="text-3xl font-bold text-mai-darkRed mb-10 text-center">
        Admin Dashboard
      </h1>
      
      <div className="mb-12">
        <NewsletterAdmin />
      </div>
    </div>
  );
};

export default Admin;
