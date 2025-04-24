
// Sample Rider data for demonstration
export interface Rider {
  id: string;
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string;
  bloodGroup: string;
  emergencyContact: string;
  vehicle: {
    registrationNumber: string;
    brand: string;
    model: string;
    pucExpiry?: string;
    insuranceExpiry?: string;
  };
  joinDate: string;
  anniversary?: string;
  totalRides: number;
  lastRideDate: string;
  status: 'active' | 'inactive';
  notes?: string;
  checklist?: {
    gearVerified: boolean;
    docsSubmitted: boolean;
  };
  stickerCode?: string;
}

export interface Ride {
  id: string;
  title: string;
  date: string;
  distance?: number;
  participants: string[]; // Rider IDs
}

// Generate mock riders
const generateMockRiders = (): Rider[] => {
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const brands = ['Royal Enfield', 'Harley Davidson', 'Triumph', 'Honda', 'Yamaha', 'KTM', 'Bajaj'];
  
  return Array.from({ length: 50 }, (_, i) => {
    const id = `R${(i + 1).toString().padStart(3, '0')}`;
    const joinDate = new Date(2021 + Math.floor(i / 20), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    
    // Calculate last ride date - either within 60 days (active) or before (inactive)
    const isActive = Math.random() > 0.3;
    const today = new Date();
    let lastRideDate;
    if (isActive) {
      // Last 60 days
      const daysAgo = Math.floor(Math.random() * 60);
      lastRideDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysAgo);
    } else {
      // Between 61 and 365 days ago
      const daysAgo = Math.floor(Math.random() * 304) + 61;
      lastRideDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysAgo);
    }
    
    const birthDate = new Date(1980 + Math.floor(Math.random() * 25), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    
    // 60% chance of having an anniversary date
    let anniversary = undefined;
    if (Math.random() > 0.4) {
      anniversary = new Date(
        2010 + Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toISOString().split('T')[0];
    }
    
    return {
      id,
      fullName: `Rider ${id}`,
      phoneNumber: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      dateOfBirth: birthDate.toISOString().split('T')[0],
      bloodGroup: bloodGroups[Math.floor(Math.random() * bloodGroups.length)],
      emergencyContact: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      vehicle: {
        registrationNumber: `MH${Math.floor(Math.random() * 50)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 9000) + 1000}`,
        brand: brands[Math.floor(Math.random() * brands.length)],
        model: `Model ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
        pucExpiry: new Date(today.getFullYear(), today.getMonth() + Math.floor(Math.random() * 12), today.getDate()).toISOString().split('T')[0],
        insuranceExpiry: new Date(today.getFullYear(), today.getMonth() + Math.floor(Math.random() * 12), today.getDate()).toISOString().split('T')[0],
      },
      joinDate: joinDate.toISOString().split('T')[0],
      anniversary,
      totalRides: Math.floor(Math.random() * 50),
      lastRideDate: lastRideDate.toISOString().split('T')[0],
      status: isActive ? 'active' : 'inactive',
      notes: Math.random() > 0.7 ? `Sample note for rider ${id}` : undefined,
      checklist: {
        gearVerified: Math.random() > 0.3,
        docsSubmitted: Math.random() > 0.4,
      },
      stickerCode: `ST${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    };
  });
};

// Generate mock rides
const generateMockRides = (riders: Rider[]): Ride[] => {
  const rides: Ride[] = [];
  const today = new Date();
  
  // Generate 30 rides in the past year
  for (let i = 0; i < 30; i++) {
    const daysAgo = Math.floor(Math.random() * 365);
    const rideDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysAgo);
    
    // Each ride has random participants
    const participantCount = Math.floor(Math.random() * 20) + 5; // 5-25 participants
    const participants: string[] = [];
    
    // Select random riders
    const riderPool = [...riders];
    for (let j = 0; j < participantCount && riderPool.length > 0; j++) {
      const randomIndex = Math.floor(Math.random() * riderPool.length);
      participants.push(riderPool[randomIndex].id);
      riderPool.splice(randomIndex, 1);
    }
    
    rides.push({
      id: `E${(i + 1).toString().padStart(3, '0')}`,
      title: `Weekend Ride #${i + 1}`,
      date: rideDate.toISOString().split('T')[0],
      distance: Math.floor(Math.random() * 300) + 50, // 50-350km
      participants,
    });
  }
  
  return rides;
};

// Export mock data
export const mockRiders = generateMockRiders();
export const mockRides = generateMockRides(mockRiders);

// Helper function to get today's date in YYYY-MM-DD format
export const getTodayDate = () => {
  return new Date().toISOString().split('T')[0];
};

// Helper function to calculate age from birth date
export const calculateAge = (birthDate: string) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};

// Helper function to format date as DD/MM/YYYY
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
};

// Helper function to get upcoming birthdays and anniversaries in the next X days
export const getUpcomingEvents = (riders: Rider[], days: number = 7) => {
  const today = new Date();
  const events: Array<{
    riderId: string;
    riderName: string;
    date: string;
    type: 'birthday' | 'anniversary';
    actualDate: Date;
  }> = [];
  
  riders.forEach(rider => {
    // Check birthday
    if (rider.dateOfBirth) {
      const birthDate = new Date(rider.dateOfBirth);
      const thisYearBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
      
      // If birthday already passed this year, check for next year
      if (thisYearBirthday < today) {
        thisYearBirthday.setFullYear(today.getFullYear() + 1);
      }
      
      const diffTime = Math.abs(thisYearBirthday.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= days) {
        events.push({
          riderId: rider.id,
          riderName: rider.fullName,
          date: `${thisYearBirthday.getDate().toString().padStart(2, '0')}/${(thisYearBirthday.getMonth() + 1).toString().padStart(2, '0')}`,
          type: 'birthday',
          actualDate: thisYearBirthday,
        });
      }
    }
    
    // Check anniversary
    if (rider.anniversary) {
      const annivDate = new Date(rider.anniversary);
      const thisYearAnniv = new Date(today.getFullYear(), annivDate.getMonth(), annivDate.getDate());
      
      // If anniversary already passed this year, check for next year
      if (thisYearAnniv < today) {
        thisYearAnniv.setFullYear(today.getFullYear() + 1);
      }
      
      const diffTime = Math.abs(thisYearAnniv.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= days) {
        events.push({
          riderId: rider.id,
          riderName: rider.fullName,
          date: `${thisYearAnniv.getDate().toString().padStart(2, '0')}/${(thisYearAnniv.getMonth() + 1).toString().padStart(2, '0')}`,
          type: 'anniversary',
          actualDate: thisYearAnniv,
        });
      }
    }
  });
  
  // Sort by date
  events.sort((a, b) => a.actualDate.getTime() - b.actualDate.getTime());
  
  return events;
};
