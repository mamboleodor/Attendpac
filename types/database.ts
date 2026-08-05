// Hand-written types matching supabase/schema.sql.
// Once your project is live, you can replace this with the CLI-generated
// types via: npx supabase gen types typescript --project-id <ref> > types/database.ts

export type UserRole = "staff" | "manager" | "org_admin" | "super_admin";
export type LeaveStatus = "pending" | "approved" | "denied";
export type AttendanceStatus = "on_time" | "late" | "absent" | "no_show";

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["organizations"]["Row"]>;
      };
      sites: {
        Row: {
          id: string;
          org_id: string;
          name: string;
          location: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          name: string;
          location?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["sites"]["Row"]>;
      };
      profiles: {
        Row: {
          id: string;
          org_id: string | null;
          site_id: string | null;
          full_name: string | null;
          email: string | null;
          role: UserRole;
          created_at: string;
        };
        Insert: {
          id: string;
          org_id?: string | null;
          site_id?: string | null;
          full_name?: string | null;
          email?: string | null;
          role?: UserRole;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      attendance_records: {
        Row: {
          id: string;
          org_id: string;
          site_id: string;
          staff_id: string;
          clock_in: string | null;
          clock_out: string | null;
          status: AttendanceStatus;
          method: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          site_id: string;
          staff_id: string;
          clock_in?: string | null;
          clock_out?: string | null;
          status?: AttendanceStatus;
          method?: string | null;
          created_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["attendance_records"]["Row"]
        >;
      };
      leave_requests: {
        Row: {
          id: string;
          org_id: string;
          site_id: string;
          staff_id: string;
          leave_type: string;
          start_date: string;
          end_date: string;
          status: LeaveStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          site_id: string;
          staff_id: string;
          leave_type: string;
          start_date: string;
          end_date: string;
          status?: LeaveStatus;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["leave_requests"]["Row"]>;
      };
      notifications: {
        Row: {
          id: string;
          org_id: string;
          site_id: string | null;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          org_id: string;
          site_id?: string | null;
          message: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["notifications"]["Row"]>;
      };
    };
  };
}
