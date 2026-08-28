"use client";

import SectionItem from "./SectionItem";
import { CurriculumSection } from "./types";

interface SectionListProps {
  sections: CurriculumSection[];

  onLessonCreated: (
    sectionId: string,
    lesson: CurriculumSection["lessons"][number],
  ) => void;
}

const SectionList = ({ sections, onLessonCreated }: SectionListProps) => {
  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <SectionItem
          key={section.id}
          section={section}
          index={index}
          onLessonCreated={onLessonCreated}
        />
      ))}
    </div>
  );
};

export default SectionList;
