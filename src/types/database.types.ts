export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ServiceStatus = "active" | "coming_soon" | "draft";
export type InquiryStatus = "new" | "contacted" | "in_progress" | "converted" | "closed" | "spam";
export type TrialBookingStatus = "pending" | "contacted" | "in_progress" | "onboarded" | "declined" | "spam";
export type TaxClassification = "uae_vat" | "indian_gst" | "other" | "none";

export interface Database {
  public: {
    Tables: {
      media_assets: {
        Row: {
          id: string;
          public_id: string;
          secure_url: string;
          width: number | null;
          height: number | null;
          format: string | null;
          alt_text: string | null;
          folder: string;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          public_id: string;
          secure_url: string;
          width?: number | null;
          height?: number | null;
          format?: string | null;
          alt_text?: string | null;
          folder?: string;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          public_id?: string;
          secure_url?: string;
          width?: number | null;
          height?: number | null;
          format?: string | null;
          alt_text?: string | null;
          folder?: string;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      site_settings: {
        Row: {
          id: string;
          setting_key: string;
          setting_value: Json;
          description: string | null;
          is_public: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          setting_key: string;
          setting_value?: Json;
          description?: string | null;
          is_public?: boolean;
          updated_at?: string;
        };
        Update: {
          id?: string;
          setting_key?: string;
          setting_value?: Json;
          description?: string | null;
          is_public?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };

      services: {
        Row: {
          id: string;
          name: string;
          slug: string;
          short_description: string;
          detailed_description: string | null;
          icon_name: string | null;
          hero_image_url: string | null;
          status: ServiceStatus;
          is_featured: boolean;
          display_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          short_description: string;
          detailed_description?: string | null;
          icon_name?: string | null;
          hero_image_url?: string | null;
          status?: ServiceStatus;
          is_featured?: boolean;
          display_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          short_description?: string;
          detailed_description?: string | null;
          icon_name?: string | null;
          hero_image_url?: string | null;
          status?: ServiceStatus;
          is_featured?: boolean;
          display_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      service_items: {
        Row: {
          id: string;
          service_id: string;
          title: string;
          description: string | null;
          icon_name: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          service_id: string;
          title: string;
          description?: string | null;
          icon_name?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          service_id?: string;
          title?: string;
          description?: string | null;
          icon_name?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "service_items_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          }
        ];
      };

      why_yolfin_items: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon_name: string | null;
          category: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          icon_name?: string | null;
          category?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          icon_name?: string | null;
          category?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      comparison_items: {
        Row: {
          id: string;
          feature_label: string;
          traditional_value: string;
          yolfin_value: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          feature_label: string;
          traditional_value: string;
          yolfin_value: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          feature_label?: string;
          traditional_value?: string;
          yolfin_value?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      testimonials: {
        Row: {
          id: string;
          client_name: string;
          company_name: string | null;
          designation: string | null;
          country: string | null;
          location: string | null;
          quote: string;
          rating: number;
          avatar_url: string | null;
          is_featured: boolean;
          is_published: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_name: string;
          company_name?: string | null;
          designation?: string | null;
          country?: string | null;
          location?: string | null;
          quote: string;
          rating?: number;
          avatar_url?: string | null;
          is_featured?: boolean;
          is_published?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_name?: string;
          company_name?: string | null;
          designation?: string | null;
          country?: string | null;
          location?: string | null;
          quote?: string;
          rating?: number;
          avatar_url?: string | null;
          is_featured?: boolean;
          is_published?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      homepage_content: {
        Row: {
          id: string;
          section_key: string;
          content: Json;
          is_published: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section_key: string;
          content?: Json;
          is_published?: boolean;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section_key?: string;
          content?: Json;
          is_published?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };

      about_content: {
        Row: {
          id: string;
          section_key: string;
          content: Json;
          is_published: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          section_key: string;
          content?: Json;
          is_published?: boolean;
          updated_at?: string;
        };
        Update: {
          id?: string;
          section_key?: string;
          content?: Json;
          is_published?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };

      contact_inquiries: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          company_name: string | null;
          service_category: string | null;
          subject: string | null;
          message: string;
          status: InquiryStatus;
          internal_notes: string | null;
          ip_address: string | null;
          submitted_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone: string;
          company_name?: string | null;
          service_category?: string | null;
          subject?: string | null;
          message: string;
          status?: InquiryStatus;
          internal_notes?: string | null;
          ip_address?: string | null;
          submitted_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          company_name?: string | null;
          service_category?: string | null;
          subject?: string | null;
          message?: string;
          status?: InquiryStatus;
          internal_notes?: string | null;
          ip_address?: string | null;
          submitted_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      trial_bookings: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          country: string;
          company_name: string | null;
          tax_classification: TaxClassification | null;
          services_interested: string[] | null;
          industry: string | null;
          employee_count: string | null;
          brief_requirements: string | null;
          preferred_start_date: string | null;
          status: TrialBookingStatus;
          internal_notes: string | null;
          submitted_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone: string;
          country?: string;
          company_name?: string | null;
          tax_classification?: TaxClassification | null;
          services_interested?: string[] | null;
          industry?: string | null;
          employee_count?: string | null;
          brief_requirements?: string | null;
          preferred_start_date?: string | null;
          status?: TrialBookingStatus;
          internal_notes?: string | null;
          submitted_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          country?: string;
          company_name?: string | null;
          tax_classification?: TaxClassification | null;
          services_interested?: string[] | null;
          industry?: string | null;
          employee_count?: string | null;
          brief_requirements?: string | null;
          preferred_start_date?: string | null;
          status?: TrialBookingStatus;
          internal_notes?: string | null;
          submitted_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      seo_metadata: {
        Row: {
          id: string;
          page_path: string;
          title: string;
          description: string;
          keywords: string[] | null;
          canonical_url: string | null;
          og_title: string | null;
          og_description: string | null;
          og_image_url: string | null;
          no_index: boolean;
          structured_data: Json | null;
          is_published: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          page_path: string;
          title: string;
          description: string;
          keywords?: string[] | null;
          canonical_url?: string | null;
          og_title?: string | null;
          og_description?: string | null;
          og_image_url?: string | null;
          no_index?: boolean;
          structured_data?: Json | null;
          is_published?: boolean;
          updated_at?: string;
        };
        Update: {
          id?: string;
          page_path?: string;
          title?: string;
          description?: string;
          keywords?: string[] | null;
          canonical_url?: string | null;
          og_title?: string | null;
          og_description?: string | null;
          og_image_url?: string | null;
          no_index?: boolean;
          structured_data?: Json | null;
          is_published?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Table Row Helpers
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
