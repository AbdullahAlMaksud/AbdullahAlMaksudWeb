"use client";

import { useState, useMemo } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { TopHeader } from "@/components/layout/TopHeader";
import { HeroIdentity } from "@/components/hero/HeroIdentity";
import { HeroBanner } from "@/components/hero/HeroBanner";
import { EnterpriseArchitectureSection } from "@/components/sections/EnterpriseArchitectureSection";
import { LiteratureEssaysSection } from "@/components/sections/LiteratureEssaysSection";
import { DesignSystemsSection } from "@/components/sections/DesignSystemsSection";
import { StrategicAdvisorySection } from "@/components/sections/StrategicAdvisorySection";
import { Footer } from "@/components/layout/Footer";
import { ArticleModal, ModalArticleData } from "@/components/interactive/ArticleModal";
import { PhysicsSimulatorModal } from "@/components/interactive/PhysicsSimulatorModal";
import { ContactEmailModal } from "@/components/interactive/ContactEmailModal";
import { useCaseStudies } from "@/lib/hooks/useCaseStudies";

export const HomeScreen = () => {
  const [selectedArticle, setSelectedArticle] = useState<ModalArticleData | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState<boolean>(false);
  const [isPhysicsModalOpen, setIsPhysicsModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  const { data: apiCaseStudies } = useCaseStudies({ published: true });

  const dynamicProjects = useMemo(() => {
    if (!apiCaseStudies || apiCaseStudies.length === 0) {
      return PORTFOLIO_DATA.enterpriseArchitecture.projects;
    }
    const mapped = apiCaseStudies.map((cs, idx) => ({
      id: cs.slug || `case-study-${idx}`,
      tag: `0${idx + 1} / ${cs.category.toUpperCase()}`,
      title: cs.title.toUpperCase(),
      description: cs.excerpt || cs.challenge,
      techStack: cs.stack || [],
      metrics: cs.results?.map((r) => `${r.metric}: ${r.value}`) || [],
      fullContent: cs.content || cs.solution,
    }));
    const existingIds = new Set(mapped.map((p) => p.id));
    const remaining = PORTFOLIO_DATA.enterpriseArchitecture.projects.filter(
      (p) => !existingIds.has(p.id)
    );
    return [...mapped, ...remaining];
  }, [apiCaseStudies]);

  const handleOpenArticle = (data: ModalArticleData) => {
    setSelectedArticle(data);
    setIsArticleModalOpen(true);
  };

  const handleCloseArticle = () => {
    setIsArticleModalOpen(false);
    setSelectedArticle(null);
  };

  return (
    <main className="flex min-h-screen w-full justify-center bg-neutral-100 px-0 py-0 sm:px-4 sm:py-6 md:px-8 lg:py-10">
      {/* Centered Editorial Portfolio Document Frame */}
      <div className="w-full max-w-[1240px] overflow-hidden border-0 bg-white shadow-2xl sm:border sm:border-black">
        {/* Top Folio Strip with Live Date */}
        <TopHeader
          badge={PORTFOLIO_DATA.meta.badge}
          issue={PORTFOLIO_DATA.meta.issue}
          folio={PORTFOLIO_DATA.meta.folio}
        />

        {/* Hero Identity with 4 Newspaper Broadsheet Story Columns */}
        <HeroIdentity
          name={PORTFOLIO_DATA.identity.name}
          role={PORTFOLIO_DATA.identity.role}
          subRole={PORTFOLIO_DATA.identity.subRole}
          navItems={PORTFOLIO_DATA.identity.navItems}
          onOpenContactModal={() => setIsContactModalOpen(true)}
        />

        {/* Hero Banner with Left Index Rail */}
        <HeroBanner verticalLabel={PORTFOLIO_DATA.meta.verticalLabel} />

        {/* Section 1: Enterprise Architecture */}
        <EnterpriseArchitectureSection
          category={PORTFOLIO_DATA.enterpriseArchitecture.category}
          titleLine1={PORTFOLIO_DATA.enterpriseArchitecture.titleLine1}
          titleLine2={PORTFOLIO_DATA.enterpriseArchitecture.titleLine2}
          projects={dynamicProjects}
          onSelectProject={handleOpenArticle}
        />

        {/* Section 2: Literature & Essays (Inverted Dark Block) */}
        <LiteratureEssaysSection
          category={PORTFOLIO_DATA.literatureEssays.category}
          titleLine1={PORTFOLIO_DATA.literatureEssays.titleLine1}
          titleLine2={PORTFOLIO_DATA.literatureEssays.titleLine2}
          imageUrl={PORTFOLIO_DATA.literatureEssays.imageUrl}
          imageAlt={PORTFOLIO_DATA.literatureEssays.imageAlt}
          items={PORTFOLIO_DATA.literatureEssays.items}
          onSelectItem={handleOpenArticle}
        />

        {/* Section 3: Design Systems (Clean 2x2 Grid) */}
        <DesignSystemsSection
          category={PORTFOLIO_DATA.designSystems.category}
          title={PORTFOLIO_DATA.designSystems.title}
          modules={PORTFOLIO_DATA.designSystems.modules}
          onOpenPhysicsSimulator={() => setIsPhysicsModalOpen(true)}
          onSelectModule={handleOpenArticle}
        />

        {/* Section 4: Full-Width Strategic Advisory Card */}
        <StrategicAdvisorySection
          data={PORTFOLIO_DATA.strategicAdvisory}
          onOpenBriefModal={() => setIsContactModalOpen(true)}
        />

        {/* Footer */}
        <Footer
          copyright={PORTFOLIO_DATA.footer.copyright}
          rights={PORTFOLIO_DATA.footer.rights}
          socials={PORTFOLIO_DATA.footer.socials}
        />
      </div>

      {/* Interactive Detail Modal */}
      <ArticleModal
        article={selectedArticle}
        isOpen={isArticleModalOpen}
        onClose={handleCloseArticle}
      />

      {/* Interactive Physics Simulator Modal */}
      <PhysicsSimulatorModal
        isOpen={isPhysicsModalOpen}
        onClose={() => setIsPhysicsModalOpen(false)}
      />

      {/* Interactive Contact & Resend Email Modal */}
      <ContactEmailModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </main>
  );
};
