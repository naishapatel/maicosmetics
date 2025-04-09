
import { useState, useEffect } from "react";
import { Newspaper, CheckCircle, XCircle, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface PendingPost {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  image_url: string | null;
  user_profile?: {
    username: string | null;
  } | null;
}

export default function BlogPostAdmin() {
  const { toast } = useToast();
  const [pendingPosts, setPendingPosts] = useState<PendingPost[]>([]);
  const [approvedPosts, setApprovedPosts] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<PendingPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingPosts();
    fetchApprovedPosts();
  }, []);

  const fetchPendingPosts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("blog_post_approvals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching pending posts:", error);
        toast({
          variant: "destructive", 
          title: "Error fetching pending posts",
          description: error.message
        });
        return;
      }

      // Fetch user profiles - Fixed to use profiles table instead of users table
      if (data) {
        const postsWithProfiles = await Promise.all(
          data.map(async (post) => {
            try {
              const { data: profileData } = await supabase
                .from("profiles")
                .select("username")
                .eq("id", post.user_id)
                .single();
              
              return {
                ...post,
                user_profile: profileData || { username: "Anonymous" }
              };
            } catch (error) {
              console.error("Error fetching profile for post:", error);
              return {
                ...post,
                user_profile: { username: "Anonymous" }
              };
            }
          })
        );
        
        setPendingPosts(postsWithProfiles);
      }
    } catch (error) {
      console.error("Error in fetchPendingPosts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApprovedPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching approved posts:", error);
        return;
      }

      if (data) {
        // Fetch user profiles - Fixed to use profiles table instead of users table
        const postsWithProfiles = await Promise.all(
          data.map(async (post) => {
            try {
              const { data: profileData } = await supabase
                .from("profiles")
                .select("username")
                .eq("id", post.user_id)
                .single();
              
              return {
                ...post,
                user_profile: profileData || { username: "Anonymous" }
              };
            } catch (error) {
              console.error("Error fetching profile for post:", error);
              return {
                ...post,
                user_profile: { username: "Anonymous" }
              };
            }
          })
        );
        
        setApprovedPosts(postsWithProfiles);
      }
    } catch (error) {
      console.error("Error in fetchApprovedPosts:", error);
    }
  };

  const handleApprove = async (post: PendingPost) => {
    try {
      // Insert into blog_posts table
      const { error: insertError } = await supabase
        .from("blog_posts")
        .insert({
          user_id: post.user_id,
          content: post.content,
          image_url: post.image_url,
          approved: true
        });

      if (insertError) {
        toast({
          variant: "destructive",
          title: "Error approving post",
          description: insertError.message
        });
        return;
      }

      // Delete from approvals table
      const { error: deleteError } = await supabase
        .from("blog_post_approvals")
        .delete()
        .eq("id", post.id);

      if (deleteError) {
        console.error("Error deleting approved post:", deleteError);
      }

      toast({
        title: "Post approved",
        description: "The blog post has been approved and published"
      });

      // Refresh data
      fetchPendingPosts();
      fetchApprovedPosts();
      setSelectedPost(null);
    } catch (error) {
      console.error("Error in handleApprove:", error);
      toast({
        variant: "destructive",
        title: "Error approving post",
        description: "An unexpected error occurred"
      });
    }
  };

  const handleReject = async (postId: string) => {
    try {
      const { error } = await supabase
        .from("blog_post_approvals")
        .delete()
        .eq("id", postId);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error rejecting post",
          description: error.message
        });
        return;
      }

      toast({
        title: "Post rejected",
        description: "The blog post has been rejected"
      });

      fetchPendingPosts();
      setSelectedPost(null);
    } catch (error) {
      console.error("Error in handleReject:", error);
      toast({
        variant: "destructive",
        title: "Error rejecting post",
        description: "An unexpected error occurred"
      });
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", postId);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error deleting post",
          description: error.message
        });
        return;
      }

      toast({
        title: "Post deleted",
        description: "The blog post has been deleted"
      });

      fetchApprovedPosts();
    } catch (error) {
      console.error("Error in handleDelete:", error);
      toast({
        variant: "destructive",
        title: "Error deleting post",
        description: "An unexpected error occurred"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Newspaper className="h-6 w-6 text-mai-mauve mr-2" />
        <h2 className="text-2xl font-bold text-mai-brown">Blog Post Management</h2>
      </div>

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
          {isLoading ? (
            <p>Loading pending posts...</p>
          ) : pendingPosts.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">No pending posts to review</p>
              </CardContent>
            </Card>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Content Preview</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">
                      {post.user_profile?.username || "Anonymous"}
                    </TableCell>
                    <TableCell>
                      {format(new Date(post.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      {post.content.length > 100
                        ? `${post.content.substring(0, 100)}...`
                        : post.content}
                    </TableCell>
                    <TableCell>
                      {post.image_url ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setPreviewImage(post.image_url);
                          }}
                        >
                          <Image className="h-4 w-4 mr-1" /> View
                        </Button>
                      ) : (
                        "No image"
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => setSelectedPost(post)}
                        >
                          Review
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>

        <TabsContent value="approved" className="mt-6">
          {approvedPosts.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-gray-500">No approved posts yet</p>
              </CardContent>
            </Card>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Content Preview</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvedPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">
                      {post.user_profile?.username || "Anonymous"}
                    </TableCell>
                    <TableCell>
                      {format(new Date(post.created_at), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      {post.content.length > 100
                        ? `${post.content.substring(0, 100)}...`
                        : post.content}
                    </TableCell>
                    <TableCell>
                      {post.image_url ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setPreviewImage(post.image_url);
                          }}
                        >
                          <Image className="h-4 w-4 mr-1" /> View
                        </Button>
                      ) : (
                        "No image"
                      )}
                    </TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Post</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this post? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(post.id)}
                              className="bg-red-500 hover:bg-red-600 text-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TabsContent>
      </Tabs>

      {/* Post Review Dialog */}
      {selectedPost && (
        <AlertDialog open={!!selectedPost} onOpenChange={(open) => !open && setSelectedPost(null)}>
          <AlertDialogContent className="max-w-3xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Review Blog Post</AlertDialogTitle>
            </AlertDialogHeader>
            
            <div className="my-4 max-h-[60vh] overflow-y-auto">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Posted by</h3>
                <p>{selectedPost.user_profile?.username || "Anonymous"}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <p>{format(new Date(selectedPost.created_at), "MMM d, yyyy • h:mm a")}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Content</h3>
                <div className="mt-2 p-4 bg-gray-50 rounded-md whitespace-pre-line">
                  {selectedPost.content}
                </div>
              </div>
              
              {selectedPost.image_url && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500">Image</h3>
                  <div className="mt-2">
                    <img 
                      src={selectedPost.image_url} 
                      alt="Post image" 
                      className="max-w-full h-auto rounded-md" 
                    />
                  </div>
                </div>
              )}
            </div>
            
            <AlertDialogFooter className="flex items-center justify-between">
              <div>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="border-red-500 text-red-500 hover:bg-red-50"
                  onClick={() => handleReject(selectedPost.id)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleApprove(selectedPost)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Image Preview Dialog */}
      {previewImage && (
        <AlertDialog open={!!previewImage} onOpenChange={(open) => !open && setPreviewImage(null)}>
          <AlertDialogContent className="max-w-3xl p-2">
            <div className="flex justify-end">
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-full h-8 w-8 p-0"
                onClick={() => setPreviewImage(null)}
              >
                ✕
              </Button>
            </div>
            <div className="flex justify-center">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="max-w-full max-h-[80vh]" 
              />
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
