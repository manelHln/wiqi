import { SiteFooter } from "@/components/site-footer";
import { CopyrightFooter } from "@/components/copyright-footer";
import { SiteHeader } from "@/components/site-header";
import { AppDownloadCTA } from "@/components/app-download-cta";
import ProfileSidebar from "@/components/profile-sidebar";
import ProtectedRoute from "@/components/protected-route";

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex container mx-auto py-12">
          <ProfileSidebar />
          <div className="flex-1">{children}</div>
        </div>
        <AppDownloadCTA />
        <SiteFooter />
        <CopyrightFooter />
      </div>
    </ProtectedRoute>
  );
}
