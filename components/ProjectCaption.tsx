import type { Project } from "@/lib/projects";
import { Ph } from "./Placeholder";

/** Spec line under a project photo: "Kitchen · Camden, DE · 6 weeks · Quartz, white oak". */
export function ProjectCaption({ project }: { project: Project }) {
  if (project.confirmed) return <>{[project.room, project.town, project.details].join(" · ")}</>;
  return (
    <Ph>
      {project.title} · {project.town} · {project.details}
    </Ph>
  );
}
