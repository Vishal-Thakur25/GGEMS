import type { Metadata } from 'next';
import {
  getAboutSections,
  getTeamMembers,
  getStatistics,
  getSiteSettings,
  getSeoSettings,
} from '@/server/queries';

import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutMissionVision from '@/components/about/AboutMissionVision';
import AboutImpact from '@/components/about/AboutImpact';
import AboutValues from '@/components/about/AboutValues';
import AboutFounder from '@/components/about/AboutFounder';
import AboutTeam from '@/components/about/AboutTeam';
import AboutCta from '@/components/about/AboutCta';
import AboutCustomSection from '@/components/about/AboutCustomSection';

export async function generateMetadata(): Promise<Metadata> {
  const [seo, site] = await Promise.all([getSeoSettings(), getSiteSettings()]);

  return {
    title: 'About Us | GGEMS Sports Academy',
    description:
      seo?.metaDescription ||
      'Learn about GGems Sports Academy, founded by Gyanendra Prajapati. Over 20 years of coaching excellence, physical health education, and elite player development.',
    openGraph: {
      title: 'About Us | GGEMS Sports Academy',
      description:
        'Building Stronger Athletes for a Brighter Tomorrow. Over 20 years of high-performance squash coaching and sports development.',
      images: [
        {
          url: '/images/Dynamic-Squash-Court-Action.png',
          width: 1200,
          height: 630,
          alt: 'GGems Sports Academy About Us',
        },
      ],
    },
  };
}

export default async function AboutPage() {
  const [sections, team, stats, siteSettings] = await Promise.all([
    getAboutSections(false), // only visible sections, ordered by displayOrder asc
    getTeamMembers(true),
    getStatistics(),
    getSiteSettings(),
  ]);

  const founderMember = team.find((t) => t.slug === 'gyanendra-prajapati');

  return (
    <div className="relative bg-white text-zinc-950 font-sans selection:bg-[#6CD34A] selection:text-black">
      {sections.map((section) => {
        switch (section.sectionType) {
          case 'HERO':
            return (
              <AboutHero
                key={section.id}
                headline={section.title || 'ABOUT GGEMS'}
                subHeadline={section.subtitle || 'Building Stronger Athletes for a Brighter Tomorrow'}
                description={
                  section.content ||
                  'At GGems Sports Academy, we are committed to developing well-rounded athletes through world-class coaching, structured programmes and a nurturing environment.'
                }
                imageUrl={section.imageUrl || '/images/Dynamic-Squash-Court-Action.png'}
                videoUrl={section.videoUrl}
                ctaLabel={section.ctaLabel}
                ctaUrl={section.ctaUrl}
              />
            );

          case 'STORY': {
            let featuresData = undefined;
            if (section.styleConfig) {
              try {
                const parsed = JSON.parse(section.styleConfig);
                if (Array.isArray(parsed.features)) {
                  featuresData = parsed.features;
                }
              } catch {
                // Ignore parse error
              }
            }
            return (
              <AboutStory
                key={section.id}
                label={section.subtitle || 'OUR STORY'}
                title={section.title || 'Passion for Sports. Commitment to Excellence.'}
                content={
                  section.content ||
                  'GGems Sports Academy was founded with a simple vision — to create a platform where young athletes can discover their potential, develop their skills and compete at higher levels.\n\nWith a strong focus on discipline, fitness and mental strength, we provide professional coaching and world-class facilities to help players excel in squash and beyond.'
                }
                imageUrl={section.imageUrl || '/images/about/story-squash-court.jpg'}
                videoUrl={section.videoUrl || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
                features={featuresData}
              />
            );
          }

          case 'MISSION_VISION': {
            let missionData = {
              missionLabel: 'OUR MISSION',
              missionTitle: 'Empowering Young Athletes',
              missionText:
                'To provide world-class coaching, modern infrastructure and a supportive environment that helps athletes develop their skills, confidence and character.',
              visionLabel: 'OUR VISION',
              visionTitle: 'A Healthier, Stronger Tomorrow',
              visionText:
                'To be a leading sports academy that nurtures talent, promotes a healthy lifestyle and produces champions at national and international levels.',
            };

            if (section.content) {
              try {
                const parsed = JSON.parse(section.content);
                if (parsed.mission) {
                  missionData.missionLabel = parsed.mission.label || missionData.missionLabel;
                  missionData.missionTitle = parsed.mission.title || missionData.missionTitle;
                  missionData.missionText = parsed.mission.description || missionData.missionText;
                }
                if (parsed.vision) {
                  missionData.visionLabel = parsed.vision.label || missionData.visionLabel;
                  missionData.visionTitle = parsed.vision.title || missionData.visionTitle;
                  missionData.visionText = parsed.vision.description || missionData.visionText;
                }
              } catch {
                // Use defaults
              }
            }

            return (
              <AboutMissionVision
                key={section.id}
                missionLabel={missionData.missionLabel}
                missionTitle={missionData.missionTitle}
                missionText={missionData.missionText}
                visionLabel={missionData.visionLabel}
                visionTitle={missionData.visionTitle}
                visionText={missionData.visionText}
              />
            );
          }

          case 'IMPACT': {
            let impactStats = stats;
            if (section.styleConfig) {
              try {
                const parsed = JSON.parse(section.styleConfig);
                if (Array.isArray(parsed.stats) && parsed.stats.length > 0) {
                  impactStats = parsed.stats.map((st: any) => ({
                    key: st.key || st.label,
                    label: st.label,
                    numericValue:
                      typeof st.value === 'number'
                        ? st.value
                        : parseInt(String(st.value).replace(/\D/g, '')) || 0,
                    prefix: st.prefix || '',
                    suffix: st.suffix || (String(st.value).includes('+') ? '+' : ''),
                    icon: st.icon,
                  }));
                }
              } catch {
                // Ignore parse error
              }
            }

            return (
              <AboutImpact
                key={section.id}
                label={section.subtitle || 'OUR IMPACT'}
                title={section.title || 'Numbers That Define Our Journey'}
                stats={impactStats}
                bgImageUrl={section.imageUrl || '/images/Dynamic-Squash-Court-Action.png'}
              />
            );
          }

          case 'VALUES': {
            let valuesData = undefined;
            if (section.styleConfig) {
              try {
                const parsed = JSON.parse(section.styleConfig);
                if (Array.isArray(parsed.values)) {
                  valuesData = parsed.values;
                }
              } catch {
                // Ignore parse error
              }
            }

            return (
              <AboutValues
                key={section.id}
                label={section.subtitle || 'OUR VALUES'}
                title={section.title || 'The Principles We Stand For'}
                subtitle={
                  section.content ||
                  'At GGems, our values shape everything we do — from coaching on the court to building character off the court.'
                }
                values={valuesData}
              />
            );
          }

          case 'FOUNDER': {
            let founderData = {
              name: 'Gyanendra Prajapati',
              role: 'Founder & CEO',
              quote:
                'Our goal is to create not just better players, but stronger, more confident individuals who can excel in every aspect of life.',
            };

            if (section.styleConfig) {
              try {
                const parsed = JSON.parse(section.styleConfig);
                founderData.name = parsed.name || founderData.name;
                founderData.role = parsed.role || founderData.role;
                founderData.quote = parsed.quote || founderData.quote;
              } catch {
                // Use defaults
              }
            }

            return (
              <AboutFounder
                key={section.id}
                label={section.subtitle || 'MEET OUR FOUNDER'}
                title={section.title || 'A Visionary Leader in Sports Development'}
                description={
                  section.content ||
                  "Our founder's vision has been the driving force behind GGems Sports Academy, creating a platform for young athletes to grow, compete and achieve excellence."
                }
                founderName={founderData.name}
                founderRole={founderData.role}
                quote={founderData.quote}
                imageUrl={
                  section.imageUrl ||
                  founderMember?.profileImage ||
                  '/images/about/founder-gyanendra.jpg'
                }
              />
            );
          }

          case 'TEAM':
            return (
              <AboutTeam
                key={section.id}
                label={section.subtitle || 'OUR TEAM'}
                title={section.title || 'Meet the People Behind GGems'}
                description={
                  section.content ||
                  'Our team of certified coaches and sports professionals work tirelessly to provide the best training, guidance and support to every player.'
                }
                members={team.map((m) => ({
                  name: m.name,
                  slug: m.slug,
                  role: m.role,
                  shortBio: m.shortBio,
                  profileImage: m.profileImage,
                }))}
              />
            );

          case 'CTA': {
            let audienceData = undefined;
            if (section.styleConfig) {
              try {
                const parsed = JSON.parse(section.styleConfig);
                if (Array.isArray(parsed.audience)) {
                  audienceData = parsed.audience;
                }
              } catch {
                // Ignore parse error
              }
            }

            return (
              <AboutCta
                key={section.id}
                subtitle={section.subtitle || 'Be Part of Our Journey'}
                title={section.title || "Let's Build a Stronger Sports Community"}
                description={
                  section.content ||
                  'Join GGems Sports Academy and take the first step toward a healthier, stronger and brighter future.'
                }
                ctaText={section.ctaLabel || 'Enquire Now'}
                ctaUrl={section.ctaUrl || '/contact'}
                callPhone={section.secondaryCtaLabel || siteSettings?.phone || '8826433044'}
                imageUrl={section.imageUrl || '/images/about/cta-squash-racket-ball.jpg'}
                audiences={audienceData}
              />
            );
          }

          case 'CUSTOM':
          default:
            return (
              <AboutCustomSection
                key={section.id}
                label={section.subtitle}
                title={section.title}
                content={section.content}
                imageUrl={section.imageUrl}
                videoUrl={section.videoUrl}
                ctaLabel={section.ctaLabel}
                ctaUrl={section.ctaUrl}
                secondaryCtaLabel={section.secondaryCtaLabel}
                secondaryCtaUrl={section.secondaryCtaUrl}
              />
            );
        }
      })}
    </div>
  );
}
