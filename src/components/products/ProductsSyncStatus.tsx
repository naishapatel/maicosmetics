
interface ProductsSyncStatusProps {
  isSyncing: boolean;
  syncError: string | null;
}

export const ProductsSyncStatus = ({ isSyncing, syncError }: ProductsSyncStatusProps) => {
  if (!isSyncing && !syncError) {
    return null;
  }
  
  return (
    <>
      {syncError && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6">
          {syncError === 'Database permissions error' ? 
            'Unable to sync products with database. You may need to log in first.' : 
            syncError}
        </div>
      )}
      
      {isSyncing && (
        <div className="bg-blue-50 text-blue-700 p-3 rounded-md mb-6 animate-pulse">
          Syncing products with database...
        </div>
      )}
    </>
  );
};
