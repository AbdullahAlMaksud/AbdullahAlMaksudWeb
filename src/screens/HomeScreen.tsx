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
import { useCaseStudiesQuery } from "@/services/case-study";
import { useBlogsQuery } from "@/services/blog";
import { useProjectsQuery, type Project } from "@/services/project";
import type { EnterpriseProject, EssayPublication, DesignSystemModule } from "@/types/portfolio";

export const HomeScreen = () => {
  const [selectedArticle, setSelectedArticle] = useState<ModalArticleData | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState<boolean>(false);
  const [isPhysicsModalOpen, setIsPhysicsModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  // 1. Fetch Case Studies for Section 1 (2 items)
  const { data: caseStudiesRes } = useCaseStudiesQuery({
    published: true,
    limit: 2,
    includeContent: true,
  });

  // 2. Fetch Blog Posts for Section 2 (4 featured blogs)
  const { data: blogsRes } = useBlogsQuery({
    published: true,
    featured: true,
    limit: 4,
    includeContent: true,
  });

  // 3. Fetch Projects for Section 3 (3 featured projects)
  const { data: projectsRes } = useProjectsQuery({
    featured: true,
    limit: 5,
  });

  // Map Case Studies to Section 1 (Exactly 2 items)
  const dynamicCaseStudies = useMemo<EnterpriseProject[]>(() => {
    const apiList = caseStudiesRes?.data;
    if (!apiList || apiList.length === 0) {
      return PORTFOLIO_DATA.enterpriseArchitecture.projects.slice(0, 2);
    }
    const mapped: EnterpriseProject[] = apiList.map((cs, idx) => ({
      id: cs.slug || cs.id || `case-study-${idx}`,
      slug: cs.slug,
      tag: `0${idx + 1} / ${cs.category?.toUpperCase() || "CASE STUDY"}`,
      title: cs.title.toUpperCase(),
      description: cs.excerpt || cs.challenge || "",
      techStack: cs.stack || [],
      metrics: cs.results?.map((r) => `${r.metric}: ${r.value}`) || [],
      fullContent: cs.content || cs.solution || "",
      content: cs.content,
    }));
    const existingIds = new Set(mapped.map((p) => p.id));
    const remaining = PORTFOLIO_DATA.enterpriseArchitecture.projects.filter(
      (p) => !existingIds.has(p.id)
    );
    return [...mapped, ...remaining].slice(0, 2);
  }, [caseStudiesRes]);

  // Map Blog Posts to Section 2 (Exactly 4 featured blogs)
  const dynamicBlogs = useMemo<EssayPublication[]>(() => {
    const apiList = blogsRes?.data;
    if (!apiList || apiList.length === 0) {
      return PORTFOLIO_DATA.literatureEssays.items.slice(0, 4);
    }
    const mapped: EssayPublication[] = apiList.map((blog, idx) => ({
      id: blog.slug || blog.id || `blog-${idx}`,
      slug: blog.slug,
      tag: (blog.type || blog.category || "ESSAY").toUpperCase(),
      title: blog.title,
      description: blog.excerpt || "",
      fullContent: blog.content || "",
      content: blog.content,
      date: blog.date || "2026",
      readTime: blog.readTime || "5 min read",
      isFullWidth: idx >= 2,
    }));
    const existingIds = new Set(mapped.map((b) => b.id));
    const remaining = PORTFOLIO_DATA.literatureEssays.items.filter((b) => !existingIds.has(b.id));
    return [...mapped, ...remaining].slice(0, 4);
  }, [blogsRes]);

  // Map Projects to Section 3 (Exactly 3 featured projects)
  const dynamicProjects = useMemo<DesignSystemModule[]>(() => {
    const rawList = projectsRes?.data;
    const apiList = Array.isArray(rawList)
      ? rawList
      : Array.isArray((rawList as any)?.items)
        ? (rawList as any).items
        : [];

    if (!apiList || apiList.length === 0) {
      return PORTFOLIO_DATA.designSystems.modules.slice(0, 3);
    }

    const mapped: DesignSystemModule[] = (apiList as Project[]).map(
      (proj: Project, idx: number) => ({
        id: proj.slug || proj.id || `project-${idx}`,
        tag:
          proj.category?.toUpperCase() ||
          (proj.status ? `FEATURED // ${proj.status.toUpperCase()}` : "FEATURED PROJECT"),
        title: proj.title,
        description: proj.description || proj.longDescription || "",
        type: "article",
        isInteractive: false,
        details: {
          overview:
            typeof proj.fullContent === "string"
              ? proj.fullContent
              : proj.longDescription || proj.description || "",
          keyPoints: [
            ...(proj.stack || proj.tags || []),
            ...(proj.coreFeatures?.map(
              (f: { text: string; desc: string }) => `${f.text}: ${f.desc}`
            ) || []),
            proj.liveLink ? `Live: ${proj.liveLink}` : "",
            proj.github ? `GitHub: ${proj.github}` : "",
          ].filter(Boolean),
        },
      })
    );

    const existingIds = new Set(mapped.map((m) => m.id));
    const remaining = PORTFOLIO_DATA.designSystems.modules.filter((m) => !existingIds.has(m.id));
    return [...mapped, ...remaining].slice(0, 3);
  }, [projectsRes]);

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

        {/* Section 1: Case Studies (Enterprise Architecture) */}
        <EnterpriseArchitectureSection
          category="01 / CASE STUDIES & ARCHITECTURE"
          titleLine1={PORTFOLIO_DATA.enterpriseArchitecture.titleLine1}
          titleLine2={PORTFOLIO_DATA.enterpriseArchitecture.titleLine2}
          projects={dynamicCaseStudies}
          onSelectProject={handleOpenArticle}
        />

        {/* Section 2: Engineering Projects (Clean 2x2 Grid) */}
        <DesignSystemsSection
          category="02 / ENGINEERING PROJECTS & SYSTEMS"
          title={PORTFOLIO_DATA.designSystems.title}
          modules={dynamicProjects}
          onOpenPhysicsSimulator={() => setIsPhysicsModalOpen(true)}
          onSelectModule={handleOpenArticle}
        />

        {/* Section 3: Blogs & Essays (Inverted Dark Block) */}
        <LiteratureEssaysSection
          category="03 / ESSAYS, MONOGRAPHS & BLOGS"
          titleLine1={PORTFOLIO_DATA.literatureEssays.titleLine1}
          titleLine2={PORTFOLIO_DATA.literatureEssays.titleLine2}
          imageUrl={PORTFOLIO_DATA.literatureEssays.imageUrl}
          imageAlt={PORTFOLIO_DATA.literatureEssays.imageAlt}
          items={dynamicBlogs}
          onSelectItem={handleOpenArticle}
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
