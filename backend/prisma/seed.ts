import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const characters = [
  {
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    status: 'ALIVE',
    gender: 'MALE',
    description: 'A genius scientist with a dark sense of humor. Rick is the smartest being in the universe, often dragging his grandson Morty into dangerous interdimensional adventures.',
  },
  {
    name: 'Morty Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    status: 'ALIVE',
    gender: 'MALE',
    description: 'A good-hearted but easily influenced young boy. Morty is Rick\'s nervous and often reluctant adventure partner across infinite dimensions.',
  },
  {
    name: 'Summer Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    status: 'ALIVE',
    gender: 'FEMALE',
    description: 'Morty\'s older sister who is more socially adept. Summer often tries to prove herself capable of joining Rick\'s adventures.',
  },
  {
    name: 'Beth Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
    status: 'ALIVE',
    gender: 'FEMALE',
    description: 'Rick\'s daughter and a horse surgeon. Beth struggles with questions about her own identity and whether she is a clone or the original.',
  },
  {
    name: 'Jerry Smith',
    image: 'https://rickandmortyapi.com/api/character/avatar/5.jpeg',
    status: 'ALIVE',
    gender: 'MALE',
    description: 'Beth\'s husband and an insecure, often clueless man. Jerry frequently clashes with Rick and struggles to find his place in the family.',
  },
  {
    name: 'Abradolf Lincler',
    image: 'https://rickandmortyapi.com/api/character/avatar/7.jpeg',
    status: 'UNKNOWN',
    gender: 'MALE',
    description: 'A failed experiment by Rick — a combination of Abraham Lincoln and Adolf Hitler, designed to be a morally neutral super-leader. His fate remains uncertain.',
  },
  {
    name: 'Adjudicator Rick',
    image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
    status: 'DEAD',
    gender: 'MALE',
    description: 'One of many Rick variants from the Citadel of Ricks. He served as an adjudicator but was killed during the Citadel massacre.',
  },
  {
    name: 'Agency Director',
    image: 'https://rickandmortyapi.com/api/character/avatar/9.jpeg',
    status: 'DEAD',
    gender: 'MALE',
    description: 'A high-ranking official of a secret galactic agency. He met his end during one of Rick\'s chaotic encounters with government forces.',
  },
  {
    name: 'Alan Rails',
    image: 'https://rickandmortyapi.com/api/character/avatar/10.jpeg',
    status: 'DEAD',
    gender: 'MALE',
    description: 'A Vindicator with the power to summon ghost trains. Alan had a complicated relationship with team leader Supernova and died during the Vindicators mission.',
  },
  {
    name: 'Beth Clone',
    image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
    status: 'UNKNOWN',
    gender: 'FEMALE',
    description: 'A clone of Beth created by Rick. It is unclear whether the Beth living at home is the original or this clone — a secret Rick may be keeping forever.',
  },
  {
    name: 'Birdperson',
    image: 'https://rickandmortyapi.com/api/character/avatar/91.jpeg',
    status: 'ALIVE',
    gender: 'MALE',
    description: 'One of Rick\'s oldest and closest friends. Birdperson is a stoic warrior who was killed by Tammy but later resurrected as Phoenixperson by the Galactic Federation.',
  },
  {
    name: 'Tammy Guetermann',
    image: 'https://rickandmortyapi.com/api/character/avatar/423.jpeg',
    status: 'DEAD',
    gender: 'FEMALE',
    description: 'A high school friend of Summer who turned out to be a deep-cover Galactic Federation agent. She married Birdperson but was eventually killed by Rick.',
  },
  {
    name: 'Mr. Meeseeks',
    image: 'https://rickandmortyapi.com/api/character/avatar/242.jpeg',
    status: 'DEAD',
    gender: 'MALE',
    description: 'A being summoned from a Meeseeks Box, created solely to fulfill one request. Their existence becomes painful if the task goes unfulfilled.',
  },
  {
    name: 'Evil Morty',
    image: 'https://rickandmortyapi.com/api/character/avatar/748.jpeg',
    status: 'ALIVE',
    gender: 'MALE',
    description: 'A calculating and ruthless Morty who broke free from the Central Finite Curve. Evil Morty rose to become President of the Citadel before escaping to a realm beyond Rick\'s reach.',
  },
  {
    name: 'Squanchy',
    image: 'https://rickandmortyapi.com/api/character/avatar/396.jpeg',
    status: 'UNKNOWN',
    gender: 'MALE',
    description: 'A catlike alien and close friend of Rick\'s. Squanchy has the ability to transform into a powerful creature and his current whereabouts are unknown.',
  },
  {
    name: 'Unity',
    image: 'https://rickandmortyapi.com/api/character/avatar/469.jpeg',
    status: 'UNKNOWN',
    gender: 'UNKNOWN',
    description: 'A hive mind entity that can assimilate and control entire civilizations. Unity had a romantic relationship with Rick but ultimately left him, recognizing the toxic dynamic between them.',
  },
  {
    name: 'The Devil',
    image: 'https://rickandmortyapi.com/api/character/avatar/83.jpeg',
    status: 'ALIVE',
    gender: 'MALE',
    description: 'An actual Devil who ran an antique shop selling cursed items. He was humiliated by Jerry Smith and forced to work in a cursed item removal business.',
  },
  {
    name: 'Abadango Cluster Princess',
    image: 'https://rickandmortyapi.com/api/character/avatar/6.jpeg',
    status: 'ALIVE',
    gender: 'FEMALE',
    description: 'A mysterious alien princess from the Abadango Cluster. Very little is known about her origins or powers.',
  },
  {
    name: 'Antenna Morty',
    image: 'https://rickandmortyapi.com/api/character/avatar/21.jpeg',
    status: 'ALIVE',
    gender: 'MALE',
    description: 'A Morty variant from the Citadel of Ricks who has antennae. He lives among thousands of other Morty variants in the interdimensional Citadel.',
  },
  {
    name: 'Antenna Rick',
    image: 'https://rickandmortyapi.com/api/character/avatar/22.jpeg',
    status: 'DEAD',
    gender: 'MALE',
    description: 'A Rick variant with antennae who resided at the Citadel of Ricks. He was killed during the political upheaval orchestrated by Evil Morty.',
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  await prisma.character.deleteMany();
  console.log('🗑️  Cleared existing characters');

  for (const character of characters) {
    await prisma.character.create({ data: character });
  }

  console.log(`✅ Seeded ${characters.length} characters successfully!`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
