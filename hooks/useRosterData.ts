import { useState, useMemo } from 'react';
import { Player } from '@/assets/interfaces/roster';

// Mock data - in production this would come from your API/database
const generateMockRoster = (teamName: string): Player[] => {
  const mockPlayers: Player[] = [
    {
      id: '1',
      name: 'John Smith',
      number: '23',
      position: 'Point Guard',
      height: '6\'2"',
      weight: '180 lbs',
      age: 22,
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      emergencyContact: {
        name: 'Mary Smith',
        phone: '(555) 987-6543',
        relationship: 'Mother'
      },
      stats: {
        gamesPlayed: 15,
        points: 245,
        assists: 89,
        rebounds: 67
      },
      status: 'active',
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      number: '15',
      position: 'Shooting Guard',
      height: '6\'4"',
      weight: '195 lbs',
      age: 24,
      email: 'mike.johnson@email.com',
      phone: '(555) 234-5678',
      emergencyContact: {
        name: 'Robert Johnson',
        phone: '(555) 876-5432',
        relationship: 'Father'
      },
      stats: {
        gamesPlayed: 14,
        points: 198,
        assists: 45,
        rebounds: 78
      },
      status: 'active',
      joinDate: '2024-01-20'
    },
    {
      id: '3',
      name: 'David Brown',
      number: '32',
      position: 'Small Forward',
      height: '6\'6"',
      weight: '210 lbs',
      age: 23,
      email: 'david.brown@email.com',
      phone: '(555) 345-6789',
      emergencyContact: {
        name: 'Lisa Brown',
        phone: '(555) 765-4321',
        relationship: 'Sister'
      },
      stats: {
        gamesPlayed: 16,
        points: 312,
        assists: 67,
        rebounds: 134
      },
      status: 'injured',
      joinDate: '2024-01-10'
    },
    {
      id: '4',
      name: 'Chris Wilson',
      number: '8',
      position: 'Power Forward',
      height: '6\'8"',
      weight: '225 lbs',
      age: 25,
      email: 'chris.wilson@email.com',
      phone: '(555) 456-7890',
      emergencyContact: {
        name: 'Jennifer Wilson',
        phone: '(555) 654-3210',
        relationship: 'Wife'
      },
      stats: {
        gamesPlayed: 15,
        points: 189,
        assists: 23,
        rebounds: 156
      },
      status: 'active',
      joinDate: '2024-02-01'
    },
    {
      id: '5',
      name: 'Robert Davis',
      number: '21',
      position: 'Center',
      height: '6\'10"',
      weight: '240 lbs',
      age: 26,
      email: 'robert.davis@email.com',
      phone: '(555) 567-8901',
      emergencyContact: {
        name: 'Patricia Davis',
        phone: '(555) 543-2109',
        relationship: 'Mother'
      },
      stats: {
        gamesPlayed: 13,
        points: 167,
        assists: 15,
        rebounds: 189
      },
      status: 'active',
      joinDate: '2024-01-25'
    }
  ];

  return mockPlayers;
};

export const useRosterData = (teamName: string) => {
  const [players, setPlayers] = useState<Player[]>(() => generateMockRoster(teamName));

  const addPlayer = (playerData: Omit<Player, 'id'>) => {
    const newPlayer: Player = {
      ...playerData,
      id: Date.now().toString(),
      stats: {
        gamesPlayed: 0,
        points: 0,
        assists: 0,
        rebounds: 0
      }
    };
    setPlayers(prev => [...prev, newPlayer]);
  };

  const removePlayer = (playerId: string) => {
    setPlayers(prev => prev.filter(player => player.id !== playerId));
  };

  const updatePlayer = (playerId: string, updates: Partial<Player>) => {
    setPlayers(prev => 
      prev.map(player => 
        player.id === playerId ? { ...player, ...updates } : player
      )
    );
  };

  const activePlayersCount = useMemo(() => 
    players.filter(player => player.status === 'active').length, 
    [players]
  );

  const injuredPlayersCount = useMemo(() => 
    players.filter(player => player.status === 'injured').length, 
    [players]
  );

  return {
    players,
    addPlayer,
    removePlayer,
    updatePlayer,
    activePlayersCount,
    injuredPlayersCount,
  };
};