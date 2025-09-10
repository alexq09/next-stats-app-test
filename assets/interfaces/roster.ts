export interface Player {
  id: string;
  name: string;
  number: string;
  position: string;
  height?: string;
  weight?: string;
  age?: number;
  email?: string;
  phone?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  stats?: {
    gamesPlayed: number;
    points: number;
    assists: number;
    rebounds: number;
  };
  status: 'active' | 'injured' | 'inactive';
  joinDate: string;
}

export interface RosterData {
  teamId: string;
  teamName: string;
  players: Player[];
  season: string;
}