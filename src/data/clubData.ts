
export interface Club {
  id: string;
  name: string;
  members: string[];
  rides: number;
  activeRiders: number;
  location: string;
}

export const mockClubs: Club[] = [
  {
    id: "1",
    name: "Mountain Riders Club",
    members: ["1", "2", "3", "4", "5"],
    rides: 145,
    activeRiders: 42,
    location: "Denver, CO"
  },
  {
    id: "2",
    name: "City Cyclists",
    members: ["6", "7", "8", "9"],
    rides: 98,
    activeRiders: 35,
    location: "Chicago, IL"
  },
  {
    id: "3",
    name: "Coastal Pedalers",
    members: ["10", "11", "12", "13", "14", "15"],
    rides: 167,
    activeRiders: 58,
    location: "San Diego, CA"
  }
];
