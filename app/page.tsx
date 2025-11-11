import { AnnouncementBar } from "@/components/announcement-bar"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { TrustedBrands } from "@/components/trusted-brands"
import { PropertyCategories } from "@/components/property-categories"
import { CTABanner } from "@/components/cta-banner"
import { PlatformPreview } from "@/components/platform-preview"
import { TrustIndicators } from "@/components/trust-indicators"
import { HowItWorks } from "@/components/how-it-works"
import { Statistics } from "@/components/statistics"
import { FeaturedProperties } from "@/components/featured-properties"
import { RecentListings } from "@/components/recent-listings"
import { Testimonials } from "@/components/testimonials"
import { NewsletterCTA } from "@/components/newsletter-cta"
import { Partners } from "@/components/partners"
import { SiteFooter } from "@/components/site-footer"
import { CashbackHowItWorks } from "@/components/cashback-how-it-works"
import { FAQSection } from "@/components/faq-section"
import { AppDownloadCTA } from "@/components/app-download-cta"
import { CopyrightFooter } from "@/components/copyright-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <TrustedBrands />
        <CashbackHowItWorks />
        {/* <HowItWorks /> */}
        {/* <PropertyCategories /> */}
        {/* <CTABanner /> */}
        <PlatformPreview />
        {/* <TrustIndicators /> */}
        <Testimonials />
        <Statistics />
        <FeaturedProperties />
        <FAQSection />
        <AppDownloadCTA />
        {/* <NewsletterCTA /> */}
        <Partners />
      </main>
      <SiteFooter />
      <CopyrightFooter />
    </div>
  )
}
