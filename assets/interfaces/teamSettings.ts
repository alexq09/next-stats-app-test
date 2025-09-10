export interface TeamSettingsData {
  id: string;
  name: string;
  organization: string;
  seasons: SeasonSettings[];
}

export interface SeasonSettings {
  id: string;
  year: string;
  active: boolean;
  record: {
    wins: number;
    losses: number;
    ties: number;
  };
  rosterSize: number;
  gamesCount: number;
  createdDate: string;
}

export interface OrganizationOption {
  id: string;
  name: string;
}