export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      community_reviews: {
        Row: {
          categories: string[] | null
          created_at: string
          id: string
          product_name: string
          rating: number
          review_text: string
          user_id: string
        }
        Insert: {
          categories?: string[] | null
          created_at?: string
          id?: string
          product_name: string
          rating: number
          review_text: string
          user_id: string
        }
        Update: {
          categories?: string[] | null
          created_at?: string
          id?: string
          product_name?: string
          rating?: number
          review_text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          id: string
          path: string
          session_id: string
          view_time: string
        }
        Insert: {
          id?: string
          path: string
          session_id: string
          view_time?: string
        }
        Update: {
          id?: string
          path?: string
          session_id?: string
          view_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "page_views_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "user_analytics"
            referencedColumns: ["session_id"]
          },
        ]
      }
      product_recommendations: {
        Row: {
          brand: string
          business_tags: string[] | null
          category: string
          created_at: string
          description: string
          ethical_values: string[]
          id: string
          images: string[] | null
          makeup_type: string
          price: string
          product_name: string
          skin_benefits: string[]
          user_id: string | null
        }
        Insert: {
          brand: string
          business_tags?: string[] | null
          category: string
          created_at?: string
          description: string
          ethical_values: string[]
          id?: string
          images?: string[] | null
          makeup_type: string
          price: string
          product_name: string
          skin_benefits?: string[]
          user_id?: string | null
        }
        Update: {
          brand?: string
          business_tags?: string[] | null
          category?: string
          created_at?: string
          description?: string
          ethical_values?: string[]
          id?: string
          images?: string[] | null
          makeup_type?: string
          price?: string
          product_name?: string
          skin_benefits?: string[]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_recommendations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string
          description: string
          id: string
          images: string[] | null
          link: string | null
          price: string
          title: string
          url: string | null
        }
        Insert: {
          category: string
          description: string
          id?: string
          images?: string[] | null
          link?: string | null
          price: string
          title: string
          url?: string | null
        }
        Update: {
          category?: string
          description?: string
          id?: string
          images?: string[] | null
          link?: string | null
          price?: string
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          id: string
          recommendation_count: number | null
          review_count: number | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id: string
          recommendation_count?: number | null
          review_count?: number | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          id?: string
          recommendation_count?: number | null
          review_count?: number | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      review_comments: {
        Row: {
          comment_text: string
          created_at: string
          id: string
          review_id: string
          user_id: string
        }
        Insert: {
          comment_text: string
          created_at?: string
          id?: string
          review_id: string
          user_id: string
        }
        Update: {
          comment_text?: string
          created_at?: string
          id?: string
          review_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_comments_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "community_reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sustainability_posts: {
        Row: {
          content: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      user_analytics: {
        Row: {
          first_seen: string
          id: string
          last_seen: string
          path: string | null
          referrer: string | null
          session_id: string
          user_agent: string | null
        }
        Insert: {
          first_seen?: string
          id?: string
          last_seen?: string
          path?: string | null
          referrer?: string | null
          session_id: string
          user_agent?: string | null
        }
        Update: {
          first_seen?: string
          id?: string
          last_seen?: string
          path?: string | null
          referrer?: string | null
          session_id?: string
          user_agent?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_page_view: {
        Args: {
          p_session_id: string
          p_path: string
        }
        Returns: undefined
      }
      update_user_activity: {
        Args: {
          p_session_id: string
          p_last_seen: string
        }
        Returns: undefined
      }
      upsert_user_analytics: {
        Args: {
          p_session_id: string
          p_last_seen: string
          p_user_agent: string
          p_referrer: string
          p_path: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
