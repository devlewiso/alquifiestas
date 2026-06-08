export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: "client" | "provider" | "admin";
          phone: string | null;
          preferred_currency: "GTQ" | "USD";
        };
        Insert: {
          id: string;
          created_at?: string;
          updated_at?: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "client" | "provider" | "admin";
          phone?: string | null;
          preferred_currency?: "GTQ" | "USD";
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "client" | "provider" | "admin";
          phone?: string | null;
          preferred_currency?: "GTQ" | "USD";
        };
      };
      providers: {
        Row: {
          id: string;
          profile_id: string;
          business_name: string;
          description: string | null;
          location: string | null;
          latitude: number | null;
          longitude: number | null;
          is_verified: boolean;
          verification_documents: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          business_name: string;
          description?: string | null;
          location?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          is_verified?: boolean;
          verification_documents?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          business_name?: string;
          description?: string | null;
          location?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          is_verified?: boolean;
          verification_documents?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          icon?: string | null;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          provider_id: string;
          category_id: string;
          name: string;
          description: string | null;
          price_gtq: number;
          price_usd: number;
          unit: string;
          images: string[] | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          provider_id: string;
          category_id: string;
          name: string;
          description?: string | null;
          price_gtq?: number;
          price_usd?: number;
          unit?: string;
          images?: string[] | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          provider_id?: string;
          category_id?: string;
          name?: string;
          description?: string | null;
          price_gtq?: number;
          price_usd?: number;
          unit?: string;
          images?: string[] | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          client_id: string;
          title: string;
          event_date: string;
          location: string | null;
          status: "draft" | "confirmed" | "completed" | "cancelled";
          total_gtq: number;
          total_usd: number;
          currency: "GTQ" | "USD";
          exchange_rate: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          title: string;
          event_date: string;
          location?: string | null;
          status?: "draft" | "confirmed" | "completed" | "cancelled";
          total_gtq?: number;
          total_usd?: number;
          currency?: "GTQ" | "USD";
          exchange_rate?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          title?: string;
          event_date?: string;
          location?: string | null;
          status?: "draft" | "confirmed" | "completed" | "cancelled";
          total_gtq?: number;
          total_usd?: number;
          currency?: "GTQ" | "USD";
          exchange_rate?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      event_items: {
        Row: {
          id: string;
          event_id: string;
          product_id: string;
          provider_id: string;
          quantity: number;
          price_gtq: number;
          price_usd: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_id: string;
          product_id: string;
          provider_id: string;
          quantity?: number;
          price_gtq?: number;
          price_usd?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_id?: string;
          product_id?: string;
          provider_id?: string;
          quantity?: number;
          price_gtq?: number;
          price_usd?: number;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
