"use client"

import * as React from "react"
import Image from "next/image"
import { Plus, Edit2, Trash2, Archive, Check, Save, PlusCircle, MinusCircle } from "lucide-react"
import { toast } from "sonner"

import { SpotlightCard } from "@/components/common/spotlight-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { fetchApiClient } from "@/lib/api-client"
import { useImageUpload } from "@/hooks/use-image-upload"
import type { PortfolioProject, PortfolioProjectFeature } from "@/types/content"

export function ProjectsManager({
  initialProjects = [],
  labels = {},
}: {
  initialProjects: PortfolioProject[]
  labels?: Record<string, any>
}) {
  const [projects, setProjects] = React.useState<PortfolioProject[]>(initialProjects)
  
  // Sheet & Dialog States
  const [isAddOpen, setIsAddOpen] = React.useState(false)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)
  
  // Selected Project for edit/delete
  const [selectedProject, setSelectedProject] = React.useState<PortfolioProject | null>(null)
  
  // Form values state
  const [formTitle, setFormTitle] = React.useState("")
  const [formSlug, setFormSlug] = React.useState("")
  const [formDescription, setFormDescription] = React.useState("")
  const [formCoverImage, setFormCoverImage] = React.useState("")
  const [formLogo, setFormLogo] = React.useState("")
  const [formStack, setFormStack] = React.useState("")
  const [formGitRepo, setFormGitRepo] = React.useState("")
  const [formLiveLink, setFormLiveLink] = React.useState("")
  const [formCategories, setFormCategories] = React.useState("")
  const [formTag, setFormTag] = React.useState("")
  const [formYear, setFormYear] = React.useState("")
  const [formStatus, setFormStatus] = React.useState<"live" | "case-study" | "prototype" | "archived">("live")
  const [formIsFeatured, setFormIsFeatured] = React.useState(false)
  const [formFeatures, setFormFeatures] = React.useState<PortfolioProjectFeature[]>([])

  // Image upload hooks
  const { isUploading: isUploadingCover, uploadImage: uploadCover } = useImageUpload()
  const { isUploading: isUploadingLogo, uploadImage: uploadLogo } = useImageUpload()

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>, prefix: string) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const url = await uploadCover(file)
      setFormCoverImage(url)
      toast.success("Cover image uploaded successfully!")
    } catch (err: any) {
      toast.error(err.message || "Failed to upload cover image")
    }
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>, prefix: string) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const url = await uploadLogo(file)
      setFormLogo(url)
      toast.success("Logo uploaded successfully!")
    } catch (err: any) {
      toast.error(err.message || "Failed to upload logo")
    }
  }

  // Reset form helper
  const resetForm = () => {
    setFormTitle("")
    setFormSlug("")
    setFormDescription("")
    setFormCoverImage("")
    setFormLogo("")
    setFormStack("")
    setFormGitRepo("")
    setFormLiveLink("")
    setFormCategories("")
    setFormTag("")
    setFormYear("")
    setFormStatus("live")
    setFormIsFeatured(false)
    setFormFeatures([{ icon: "receipt", text: "", desc: "" }])
  }

  // Populate form helper
  const populateForm = (project: PortfolioProject) => {
    setFormTitle(project.title)
    setFormSlug(project.id)
    setFormDescription(project.description || "")
    setFormCoverImage(project.coverImage || "")
    setFormLogo(project.logo || "")
    setFormStack(project.stack?.join(", ") || "")
    setFormGitRepo(project.gitRepo || "")
    setFormLiveLink(project.liveLink || "")
    setFormCategories(project.categories?.join(", ") || "")
    setFormTag(project.tag || "")
    setFormYear(project.createdAt || "")
    setFormStatus(project.isArchived ? "archived" : ((project as any).status || "live"))
    setFormIsFeatured(!!project.isFeatured)
    setFormFeatures(project.coreFeatures || [])
  }

  // Handle opening the Add Dialog
  const handleOpenAdd = () => {
    resetForm()
    setIsAddOpen(true)
  }

  // Handle opening the Edit Dialog
  const handleOpenEdit = (project: PortfolioProject) => {
    setSelectedProject(project)
    populateForm(project)
    setIsEditOpen(true)
  }

  // Handle opening the Delete Dialog
  const handleOpenDelete = (project: PortfolioProject) => {
    setSelectedProject(project)
    setIsDeleteOpen(true)
  }

  // Add Core Feature Row
  const addFeatureRow = () => {
    setFormFeatures([...formFeatures, { icon: "receipt", text: "", desc: "" }])
  }

  // Remove Core Feature Row
  const removeFeatureRow = (index: number) => {
    const updated = [...formFeatures]
    updated.splice(index, 1)
    setFormFeatures(updated)
  }

  // Update Core Feature Field
  const updateFeatureField = (index: number, field: keyof PortfolioProjectFeature, value: string) => {
    const updated = [...formFeatures]
    updated[index] = { ...updated[index], [field]: value }
    setFormFeatures(updated)
  }

  // Handle Create Project
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const stack = formStack.split(",").map(s => s.trim()).filter(Boolean)
    const categories = formCategories.split(",").map(c => c.trim()).filter(Boolean)

    const payload = {
      title: formTitle,
      slug: formSlug,
      description: formDescription,
      coverImage: formCoverImage,
      logo: formLogo,
      stack,
      gitRepo: formGitRepo,
      liveLink: formLiveLink,
      categories,
      tag: formTag,
      year: formYear,
      status: formStatus,
      isFeatured: formIsFeatured,
      isArchived: formStatus === "archived",
      coreFeatures: formFeatures.filter(f => f.text && f.desc),
    }

    try {
      const res = await fetchApiClient<{ success: boolean; data: PortfolioProject }>("/api/v1/projects", {
        method: "POST",
        body: JSON.stringify(payload),
      })

      if (res.success && res.data) {
        setProjects([res.data, ...projects])
        toast.success("Project added successfully!")
        setIsAddOpen(false)
        resetForm()
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create project")
    }
  }

  // Handle Edit Project
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProject) return

    const stack = formStack.split(",").map(s => s.trim()).filter(Boolean)
    const categories = formCategories.split(",").map(c => c.trim()).filter(Boolean)

    const payload = {
      title: formTitle,
      slug: formSlug,
      description: formDescription,
      coverImage: formCoverImage,
      logo: formLogo,
      stack,
      gitRepo: formGitRepo,
      liveLink: formLiveLink,
      categories,
      tag: formTag,
      year: formYear,
      status: formStatus,
      isFeatured: formIsFeatured,
      isArchived: formStatus === "archived",
      coreFeatures: formFeatures.filter(f => f.text && f.desc),
    }

    try {
      const res = await fetchApiClient<{ success: boolean; data: PortfolioProject }>(`/api/v1/projects/${selectedProject.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      })

      if (res.success && res.data) {
        setProjects(projects.map(p => p.id === selectedProject.id ? res.data : p))
        toast.success("Project updated successfully!")
        setIsEditOpen(false)
        setSelectedProject(null)
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update project")
    }
  }

  // Handle Delete Project
  const handleDelete = async () => {
    if (!selectedProject) return
    try {
      const res = await fetchApiClient<{ success: boolean }>(`/api/v1/projects/${selectedProject.id}`, {
        method: "DELETE",
      })

      if (res.success) {
        setProjects(projects.filter(p => p.id !== selectedProject.id))
        toast.success("Project deleted successfully!")
        setIsDeleteOpen(false)
        setSelectedProject(null)
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to delete project")
    }
  }

  // Quick Toggle Archive Status
  const handleToggleArchive = async (project: PortfolioProject) => {
    const nextStatus = project.isArchived ? "live" : "archived"
    const payload = {
      status: nextStatus,
      isArchived: nextStatus === "archived"
    }

    try {
      const res = await fetchApiClient<{ success: boolean; data: PortfolioProject }>(`/api/v1/projects/${project.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      })

      if (res.success && res.data) {
        setProjects(projects.map(p => p.id === project.id ? res.data : p))
        toast.success(project.isArchived ? "Project restored from archive!" : "Project archived successfully!")
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to toggle archive state")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header and Add Button */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Manage Projects</h2>
          <p className="text-sm text-muted-foreground">Add, edit, delete and archive your portfolio projects.</p>
        </div>
        <Button onClick={handleOpenAdd} className="rounded-xl gap-2 font-medium bg-primary hover:bg-primary/95 text-white">
          <Plus className="size-4" />
          Add New Project
        </Button>
      </div>

      {/* Projects Grid/List */}
      <SpotlightCard className="overflow-hidden border border-border/50 bg-card/40 backdrop-blur-md rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4">Stack</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground text-sm">
                    No projects found in database. Create one to get started!
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-muted/15 transition duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative size-12 overflow-hidden rounded-xl border border-border/60 bg-muted/40 p-1 flex items-center justify-center">
                          {project.logo ? (
                            <Image
                              src={project.logo}
                              alt=""
                              width={40}
                              height={40}
                              className="object-contain"
                            />
                          ) : (
                            <span className="text-sm font-bold uppercase">{project.title[0]}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{project.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{project.tag}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {project.isArchived ? (
                        <Badge variant="outline" className="border-destructive/30 bg-destructive/10 text-destructive text-xs rounded-full">
                          Archived
                        </Badge>
                      ) : (
                        <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs rounded-full">
                          {(project as any).status || "Live"}
                        </Badge>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {project.isFeatured ? (
                        <Badge className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs rounded-full gap-1">
                          <Check className="size-3" /> Yes
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[250px]">
                        {project.stack?.slice(0, 3).map((s) => (
                          <span key={s} className="px-2 py-0.5 rounded-md bg-muted text-[10px] text-muted-foreground font-mono">
                            {s}
                          </span>
                        ))}
                        {project.stack?.length > 3 && (
                          <span className="text-[10px] text-muted-foreground font-mono self-center">
                            +{project.stack.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleOpenEdit(project)}
                          className="hover:bg-muted text-muted-foreground hover:text-foreground"
                          title="Edit Project"
                        >
                          <Edit2 className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleToggleArchive(project)}
                          className={`hover:bg-muted ${project.isArchived ? "text-emerald-500" : "text-amber-500"}`}
                          title={project.isArchived ? "Publish Project" : "Archive Project"}
                        >
                          <Archive className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleOpenDelete(project)}
                          className="hover:bg-destructive/10 text-destructive/80 hover:text-destructive"
                          title="Delete Project"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SpotlightCard>

      {/* ADD SHEET DRAWER */}
      <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
        <SheetContent className="sm:max-w-2xl w-[95vw] overflow-y-auto rounded-l-2xl p-6 glass-panel premium-border">
          <SheetHeader className="p-0 mb-6">
            <SheetTitle className="text-xl font-bold">Add New Project</SheetTitle>
            <SheetDescription>Fill in details to save this project in the database.</SheetDescription>
          </SheetHeader>
          
          <form onSubmit={handleCreate} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-1">
                <Label htmlFor="add-title">Project Title</Label>
                <Input id="add-title" value={formTitle} onChange={e => setFormTitle(e.target.value)} required placeholder="e.g. বন্টন" className="rounded-xl" />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="add-slug">URL Slug / Key</Label>
                <Input id="add-slug" value={formSlug} onChange={e => setFormSlug(e.target.value)} required placeholder="e.g. bonton" className="rounded-xl" />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="add-tag">Tagline / Brief Hook</Label>
                <Input id="add-tag" value={formTag} onChange={e => setFormTag(e.target.value)} placeholder="e.g. Local-first settlement system" className="rounded-xl" />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="add-year">Date / Year Created</Label>
                <Input id="add-year" value={formYear} onChange={e => setFormYear(e.target.value)} placeholder="e.g. 2025-11-01" className="rounded-xl" />
              </div>

              {/* Cover Image URL & File Upload */}
              <div className="grid gap-1 md:col-span-2">
                <Label htmlFor="add-coverImage">Cover Image</Label>
                <div className="flex gap-2">
                  <Input id="add-coverImage" value={formCoverImage} onChange={e => setFormCoverImage(e.target.value)} placeholder="e.g. /images/project/bonton.png" className="rounded-xl flex-1" />
                  <div className="relative">
                    <input type="file" id="cover-file-add" accept="image/*" className="hidden" onChange={e => handleCoverUpload(e, "add")} />
                    <Button type="button" variant="outline" className="rounded-xl cursor-pointer h-10" onClick={() => document.getElementById('cover-file-add')?.click()} disabled={isUploadingCover}>
                      {isUploadingCover ? "Uploading..." : "Upload File"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Logo URL & File Upload */}
              <div className="grid gap-1 md:col-span-2">
                <Label htmlFor="add-logo">Logo Image</Label>
                <div className="flex gap-2">
                  <Input id="add-logo" value={formLogo} onChange={e => setFormLogo(e.target.value)} placeholder="e.g. /images/project/logo/bonton.png" className="rounded-xl flex-1" />
                  <div className="relative">
                    <input type="file" id="logo-file-add" accept="image/*" className="hidden" onChange={e => handleLogoUpload(e, "add")} />
                    <Button type="button" variant="outline" className="rounded-xl cursor-pointer h-10" onClick={() => document.getElementById('logo-file-add')?.click()} disabled={isUploadingLogo}>
                      {isUploadingLogo ? "Uploading..." : "Upload File"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="add-gitRepo">GitHub Repo URL</Label>
                <Input id="add-gitRepo" value={formGitRepo} onChange={e => setFormGitRepo(e.target.value)} placeholder="https://github.com/..." className="rounded-xl" />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="add-liveLink">Live Link / Deployment</Label>
                <Input id="add-liveLink" value={formLiveLink} onChange={e => setFormLiveLink(e.target.value)} placeholder="https://bonton..." className="rounded-xl" />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="add-stack">Technology Stack (comma separated)</Label>
                <Input id="add-stack" value={formStack} onChange={e => setFormStack(e.target.value)} placeholder="React, TypeScript, Tailwind" className="rounded-xl" />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="add-categories">Categories (comma separated)</Label>
                <Input id="add-categories" value={formCategories} onChange={e => setFormCategories(e.target.value)} placeholder="saas, tool, finance" className="rounded-xl" />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="add-status">Status</Label>
                <select
                  id="add-status"
                  value={formStatus}
                  onChange={e => setFormStatus(e.target.value as any)}
                  className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none transition"
                >
                  <option value="live">Live</option>
                  <option value="case-study">Case Study</option>
                  <option value="prototype">Prototype</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="add-featured"
                  checked={formIsFeatured}
                  onChange={e => setFormIsFeatured(e.target.checked)}
                  className="size-4 rounded-sm border-primary accent-primary"
                />
                <Label htmlFor="add-featured" className="cursor-pointer">Feature this project on homepage</Label>
              </div>
            </div>

            <div className="grid gap-1">
              <Label htmlFor="add-description">Full Description</Label>
              <Textarea id="add-description" value={formDescription} onChange={e => setFormDescription(e.target.value)} placeholder="Write description..." className="min-h-20 rounded-xl" />
            </div>

            {/* Core Features Dynamic Fields */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-semibold text-sm">Core Features ({formFeatures.length})</Label>
                <Button type="button" variant="outline" size="sm" onClick={addFeatureRow} className="rounded-lg gap-1 border-primary/20 text-primary hover:bg-primary/5">
                  <PlusCircle className="size-3.5" />
                  Add Feature
                </Button>
              </div>
              
              {formFeatures.map((feat, idx) => (
                <div key={idx} className="flex gap-2 items-start border p-3 rounded-xl bg-muted/10 relative">
                  <div className="grid gap-2 flex-1 md:grid-cols-3">
                    <div>
                      <Label className="text-[10px] text-muted-foreground">Icon name</Label>
                      <Input value={feat.icon || ""} onChange={e => updateFeatureField(idx, "icon", e.target.value)} placeholder="e.g. split, receipt" className="h-8 text-xs rounded-lg" />
                    </div>
                    <div>
                      <Label className="text-[10px] text-muted-foreground">Feature Name</Label>
                      <Input value={feat.text} onChange={e => updateFeatureField(idx, "text", e.target.value)} placeholder="e.g. Flexible Split" required className="h-8 text-xs rounded-lg" />
                    </div>
                    <div>
                      <Label className="text-[10px] text-muted-foreground">Brief Description</Label>
                      <Input value={feat.desc} onChange={e => updateFeatureField(idx, "desc", e.target.value)} placeholder="e.g. Equal, percentage splits" required className="h-8 text-xs rounded-lg" />
                    </div>
                  </div>
                  <Button type="button" variant="ghost" size="icon-sm" onClick={() => removeFeatureRow(idx)} className="self-end text-destructive/70 hover:text-destructive hover:bg-destructive/5 mt-4">
                    <MinusCircle className="size-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 border-t pt-4">
              <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)} className="rounded-xl">Cancel</Button>
              <Button type="submit" className="rounded-xl gap-1 bg-primary text-white hover:bg-primary/95 h-10">
                <Save className="size-4" />
                Save Project
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* EDIT SHEET DRAWER */}
      <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
        <SheetContent className="sm:max-w-2xl w-[95vw] overflow-y-auto rounded-l-2xl p-6 glass-panel premium-border">
          <SheetHeader className="p-0 mb-6">
            <SheetTitle className="text-xl font-bold">Edit Project</SheetTitle>
            <SheetDescription>Update form fields to modify this portfolio project.</SheetDescription>
          </SheetHeader>
          
          <form onSubmit={handleUpdate} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-1">
                <Label htmlFor="edit-title">Project Title</Label>
                <Input id="edit-title" value={formTitle} onChange={e => setFormTitle(e.target.value)} required placeholder="e.g. বন্টন" className="rounded-xl" />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="edit-slug">URL Slug / Key</Label>
                <Input id="edit-slug" value={formSlug} onChange={e => setFormSlug(e.target.value)} required placeholder="e.g. bonton" className="rounded-xl" />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="edit-tag">Tagline / Brief Hook</Label>
                <Input id="edit-tag" value={formTag} onChange={e => setFormTag(e.target.value)} placeholder="e.g. Local-first settlement system" className="rounded-xl" />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="edit-year">Date / Year Created</Label>
                <Input id="edit-year" value={formYear} onChange={e => setFormYear(e.target.value)} placeholder="e.g. 2025-11-01" className="rounded-xl" />
              </div>

              {/* Cover Image URL & File Upload */}
              <div className="grid gap-1 md:col-span-2">
                <Label htmlFor="edit-coverImage">Cover Image</Label>
                <div className="flex gap-2">
                  <Input id="edit-coverImage" value={formCoverImage} onChange={e => setFormCoverImage(e.target.value)} placeholder="e.g. /images/project/bonton.png" className="rounded-xl flex-1" />
                  <div className="relative">
                    <input type="file" id="cover-file-edit" accept="image/*" className="hidden" onChange={e => handleCoverUpload(e, "edit")} />
                    <Button type="button" variant="outline" className="rounded-xl cursor-pointer h-10" onClick={() => document.getElementById('cover-file-edit')?.click()} disabled={isUploadingCover}>
                      {isUploadingCover ? "Uploading..." : "Upload File"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Logo URL & File Upload */}
              <div className="grid gap-1 md:col-span-2">
                <Label htmlFor="edit-logo">Logo Image</Label>
                <div className="flex gap-2">
                  <Input id="edit-logo" value={formLogo} onChange={e => setFormLogo(e.target.value)} placeholder="e.g. /images/project/logo/bonton.png" className="rounded-xl flex-1" />
                  <div className="relative">
                    <input type="file" id="logo-file-edit" accept="image/*" className="hidden" onChange={e => handleLogoUpload(e, "edit")} />
                    <Button type="button" variant="outline" className="rounded-xl cursor-pointer h-10" onClick={() => document.getElementById('logo-file-edit')?.click()} disabled={isUploadingLogo}>
                      {isUploadingLogo ? "Uploading..." : "Upload File"}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-1">
                <Label htmlFor="edit-gitRepo">GitHub Repo URL</Label>
                <Input id="edit-gitRepo" value={formGitRepo} onChange={e => setFormGitRepo(e.target.value)} placeholder="https://github.com/..." className="rounded-xl" />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="edit-liveLink">Live Link / Deployment</Label>
                <Input id="edit-liveLink" value={formLiveLink} onChange={e => setFormLiveLink(e.target.value)} placeholder="https://bonton..." className="rounded-xl" />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="edit-stack">Technology Stack (comma separated)</Label>
                <Input id="edit-stack" value={formStack} onChange={e => setFormStack(e.target.value)} placeholder="React, TypeScript, Tailwind" className="rounded-xl" />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="edit-categories">Categories (comma separated)</Label>
                <Input id="edit-categories" value={formCategories} onChange={e => setFormCategories(e.target.value)} placeholder="saas, tool, finance" className="rounded-xl" />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  value={formStatus}
                  onChange={e => setFormStatus(e.target.value as any)}
                  className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none transition"
                >
                  <option value="live">Live</option>
                  <option value="case-study">Case Study</option>
                  <option value="prototype">Prototype</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="edit-featured"
                  checked={formIsFeatured}
                  onChange={e => setFormIsFeatured(e.target.checked)}
                  className="size-4 rounded-sm border-primary accent-primary"
                />
                <Label htmlFor="edit-featured" className="cursor-pointer">Feature this project on homepage</Label>
              </div>
            </div>

            <div className="grid gap-1">
              <Label htmlFor="edit-description">Full Description</Label>
              <Textarea id="edit-description" value={formDescription} onChange={e => setFormDescription(e.target.value)} placeholder="Write description..." className="min-h-20 rounded-xl" />
            </div>

            {/* Core Features Dynamic Fields */}
            <div className="border-t pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <Label className="font-semibold text-sm">Core Features ({formFeatures.length})</Label>
                <Button type="button" variant="outline" size="sm" onClick={addFeatureRow} className="rounded-lg gap-1 border-primary/20 text-primary hover:bg-primary/5">
                  <PlusCircle className="size-3.5" />
                  Add Feature
                </Button>
              </div>
              
              {formFeatures.map((feat, idx) => (
                <div key={idx} className="flex gap-2 items-start border p-3 rounded-xl bg-muted/10 relative">
                  <div className="grid gap-2 flex-1 md:grid-cols-3">
                    <div>
                      <Label className="text-[10px] text-muted-foreground">Icon name</Label>
                      <Input value={feat.icon || ""} onChange={e => updateFeatureField(idx, "icon", e.target.value)} placeholder="e.g. split, receipt" className="h-8 text-xs rounded-lg" />
                    </div>
                    <div>
                      <Label className="text-[10px] text-muted-foreground">Feature Name</Label>
                      <Input value={feat.text} onChange={e => updateFeatureField(idx, "text", e.target.value)} placeholder="e.g. Flexible Split" required className="h-8 text-xs rounded-lg" />
                    </div>
                    <div>
                      <Label className="text-[10px] text-muted-foreground">Brief Description</Label>
                      <Input value={feat.desc} onChange={e => updateFeatureField(idx, "desc", e.target.value)} placeholder="e.g. Equal, percentage splits" required className="h-8 text-xs rounded-lg" />
                    </div>
                  </div>
                  <Button type="button" variant="ghost" size="icon-sm" onClick={() => removeFeatureRow(idx)} className="self-end text-destructive/70 hover:text-destructive hover:bg-destructive/5 mt-4">
                    <MinusCircle className="size-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 border-t pt-4">
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)} className="rounded-xl">Cancel</Button>
              <Button type="submit" className="rounded-xl gap-1 bg-primary text-white hover:bg-primary/95 h-10">
                <Save className="size-4" />
                Update Project
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* DELETE DIALOG */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md rounded-2xl glass-panel premium-border p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-destructive">Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{selectedProject?.title}</strong>? This action is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-end gap-2 border-t pt-4 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)} className="rounded-xl">Cancel</Button>
            <Button onClick={handleDelete} className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Confirm Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
