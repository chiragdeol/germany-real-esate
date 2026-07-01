import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

export type Opportunity = {
  id: string;
  name: string;
  location: string;
  size: string;
  type: string;
  description: string;
  image: string;
};

export const opportunities: Opportunity[] = [
  {
    id: "harbour-quarter",
    name: "Nordhavn Harbour Quarter",
    location: "Aarhus, Denmark",
    size: "€120M",
    type: "Urban regeneration",
    description:
      "Mixed-use redevelopment of a 9-hectare waterfront site combining housing, hospitality, and creative workspace anchored by a new public promenade.",
    image: project1,
  },
  {
    id: "iberian-renewables",
    name: "Iberian Renewables Cluster",
    location: "Évora region, Portugal",
    size: "€85M",
    type: "Renewable energy",
    description:
      "Co-located wind and solar portfolio with grid connection secured and 20-year offtake commitments from three regional utilities.",
    image: project2,
  },
  {
    id: "leuven-residences",
    name: "Leuven City Residences",
    location: "Leuven, Belgium",
    size: "€42M",
    type: "Residential development",
    description:
      "Mid-rise residential scheme of 180 units in a high-demand university city, partnered with the municipality under a long-lease structure.",
    image: project3,
  },
];
