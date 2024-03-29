// src/data/models.ts

import { ThreeDModelModel } from './models/3Dmodel';

// Sample data for testing
const sampleModels = [
  {
    name: 'Sample Model 1',
    path: '/src/3dmodel/FinalBaseMesh.obj',
    description: 'This is a sample 3D model for testing purposes.',
  },
  // Add more sample models as needed
];

// Function to seed sample models into the database
export const seedSampleModels = async (): Promise<void> => {
  try {
    await ThreeDModelModel.create(sampleModels);
    console.log('Sample models seeded successfully.');
  } catch (error) {
    console.error('Error seeding sample models:', error);
  }
};
