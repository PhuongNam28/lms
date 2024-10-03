"use client";

import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import {
  FcRules,
  FcReading,
  FcDecision,
  FcLink,
  FcVoicePresentation,
  FcDocument,
  FcMultipleInputs,
} from "react-icons/fc";
import CategoryItem from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  Grammar: FcRules,
  Vocabulary: FcReading,
  "Conditional Sentence": FcDecision,
  "Relative Clause": FcLink,
  "Passive Voice": FcVoicePresentation,
  Gerunds: FcDocument,
  Infinitives: FcMultipleInputs,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2 ">
      {items.map((item)=>(
        <CategoryItem
            key= {item.id}
            label={item.name}
            icon={iconMap[item.name]}
            value={item.id}
        />
      ))}
    </div>
  );
};
