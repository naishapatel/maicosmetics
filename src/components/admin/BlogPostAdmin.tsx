
import { Newspaper, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogPostError } from "../community/BlogPostError";
import { PendingPostsTable } from "./blog/PendingPostsTable";
import { ApprovedPostsTable } from "./blog/ApprovedPostsTable";
import { PostReviewDialog } from "./blog/PostReviewDialog";
import { ImagePreviewDialog } from "./blog/ImagePreviewDialog";
import { useBlogAdminState } from "./blog/useBlogAdminState";

export default function BlogPostAdmin() {
  const { 
    pendingPosts,
    approvedPosts,
    selectedPost,
    setSelectedPost,
    isLoading,
    fetchError,
    previewImage,
    setPreviewImage,
    fetchAttempts,
    setFetchAttempts,
    handleApprove,
    handleReject,
    handleDelete,
    handleRetry 
  } = useBlogAdminState();

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Newspaper className="h-6 w-6 text-mai-mauve mr-2" />
        <h2 className="text-2xl font-bold text-mai-brown">Blog Post Management</h2>
      </div>

      <Button 
        onClick={() => setFetchAttempts(prev => prev + 1)}
        className="bg-mai-mauve hover:bg-mai-mauveDark mb-4"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Refresh Posts
      </Button>

      {fetchError && (
        <BlogPostError error={fetchError} onRetry={handleRetry}>
          <div className="mt-2 p-3 bg-red-50 border border-red-100 rounded text-sm">
            <p className="font-semibold">Debug Information:</p>
            <p className="font-semibold">Current Issue:</p>
            <p>This error is due to the application not having the correct permissions to query the users table in Supabase. The admin panel needs Row Level Security (RLS) policies to be configured for the blog_post_approvals table.</p>
            <p className="mt-2 font-semibold">Please check:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>That you are logged in as an admin user</li>
              <li>That RLS policies are correctly set up for the blog_post_approvals table</li>
              <li>That your admin email matches exactly what's in Admin.tsx</li>
            </ul>
          </div>
        </BlogPostError>
      )}

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending" className="relative">
            Pending Approval
            {pendingPosts.length > 0 && (
              <span className="ml-2 bg-mai-mauve text-white text-xs rounded-full px-2 py-0.5">
                {pendingPosts.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">Approved Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6">
          <PendingPostsTable 
            posts={pendingPosts} 
            isLoading={isLoading} 
            onReview={setSelectedPost}
            onPreviewImage={setPreviewImage}
          />
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          <ApprovedPostsTable 
            posts={approvedPosts} 
            onPreviewImage={setPreviewImage}
            onDelete={handleDelete}
          />
        </TabsContent>
      </Tabs>

      {selectedPost && (
        <PostReviewDialog 
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      <ImagePreviewDialog 
        imageUrl={previewImage} 
        onClose={() => setPreviewImage(null)}
      />
    </div>
  );
}
