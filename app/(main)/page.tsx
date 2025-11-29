import { AnnouncementBar } from "@/components/announcement-bar"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { TrustedBrands } from "@/components/trusted-brands"
import { PlatformPreview } from "@/components/platform-preview"
import { Statistics } from "@/components/statistics"
import { FeaturedProperties } from "@/components/featured-properties"
import { Testimonials } from "@/components/testimonials"
import { SiteFooter } from "@/components/site-footer"
import { CashbackHowItWorks } from "@/components/cashback-how-it-works"
import { FAQSection } from "@/components/faq-section"
import { AppDownloadCTA } from "@/components/app-download-cta"
import { CopyrightFooter } from "@/components/copyright-footer"
import CashbackOffers from "@/components/cashback-offers"
import { Partners } from "@/components/partners"

export default function Home() {
  return (

      <main className="flex-1">
        <HeroSection />
        <Partners />
        {/* <TrustedBrands /> */}
        <CashbackHowItWorks />
        <CashbackOffers />
        {/* <PlatformPreview /> */}
        <Testimonials />
        <Statistics />
        <FeaturedProperties />
        <FAQSection />
      </main>
  )
}
