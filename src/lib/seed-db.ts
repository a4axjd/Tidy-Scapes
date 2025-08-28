// Use this script to seed your Firestore database with initial data.
// Run `npm run seed` to execute.

import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const blogPosts = [
  {
    slug: 'spring-lawn-care-tips',
    image: 'https://picsum.photos/600/400?random=1',
    hint: 'green lawn',
    title: 'Top 5 Spring Lawn Care Tips for a Lush Yard',
    description: 'Get your lawn in top shape for the summer with these essential spring maintenance tips.',
    date: 'April 15, 2024',
    content: [
      'As the weather warms up, it\'s time to give your lawn some much-needed attention after the long winter months. A little effort now will pay off with a beautiful, healthy lawn that you can enjoy all summer long.',
      'Our first tip is to rake thoroughly. Winter can leave behind a layer of dead grass, leaves, and other debris known as thatch. Raking helps to remove this layer, allowing new grass to grow. For larger lawns, a dethatching machine can be a great time-saver.',
      'Next, it\'s important to aerate your soil. Over time, soil can become compacted, which prevents air, water, and nutrients from reaching the roots of your grass. Core aeration removes small plugs of soil, which helps to alleviate compaction and improve the overall health of your lawn.',
      'Fertilizing is another key step. A slow-release nitrogen fertilizer is ideal for spring, as it will provide a steady supply of nutrients for your grass. Be sure to follow the instructions on the package carefully to avoid over-fertilizing, which can damage your lawn.',
      'Finally, address any bare patches. You can reseed these areas with a grass type that matches the rest of your lawn. Keep the newly seeded areas moist until the grass is well-established. With these tips, you\'ll be on your way to a beautiful and healthy lawn this spring!'
    ]
  },
  {
    slug: 'choosing-the-right-plants',
    image: 'https://picsum.photos/600/400?random=2',
    hint: 'colorful flowers',
    title: 'How to Choose the Right Plants for Your Garden',
    description: 'A guide to selecting plants that will thrive in your specific garden conditions.',
    date: 'May 2, 2024',
    content: [
        'Creating a beautiful garden starts with choosing the right plants. But with so many options available, it can be overwhelming to know where to start. The key is to select plants that are well-suited to your garden\'s specific conditions.',
        'First, consider your climate and hardiness zone. This will help you narrow down your choices to plants that can survive the winter in your area. You can find your hardiness zone online or by consulting with a local nursery.',
        'Next, think about the amount of sunlight your garden receives. Is it in full sun, partial shade, or full shade? Different plants have different light requirements, so it\'s important to choose plants that will thrive in the amount of light your garden gets.',
        'Soil type is another important factor. Is your soil sandy, loamy, or clay-based? Some plants prefer well-drained soil, while others can tolerate more moisture. You can have your soil tested to determine its type and pH level.',
        'Finally, consider the size and shape of your garden. Choose a variety of plants with different heights, textures, and colors to create visual interest. And don\'t forget to think about when each plant will bloom, so you can have color in your garden throughout the growing season.'
    ]
  },
  {
    slug: 'benefits-of-tree-pruning',
    image: 'https://picsum.photos/600/400?random=3',
    hint: 'pruning tree',
    title: 'The Unseen Benefits of Professional Tree Pruning',
    description: 'Discover why regular tree pruning is crucial for the health, safety, and beauty of your property.',
    date: 'May 20, 2024',
    content: [
        'Tree pruning is more than just a cosmetic procedure; it\'s a vital part of maintaining the health and longevity of your trees. While it may seem like a simple task, professional pruning can provide a multitude of benefits for your landscape.',
        'One of the primary benefits of pruning is improved tree health. Removing dead, diseased, or damaged branches prevents the spread of decay and disease, and allows the tree to focus its energy on new, healthy growth.',
        'Pruning also enhances the safety of your property. Dead or weak branches can be a hazard, especially during storms or high winds. By removing these branches, you can reduce the risk of property damage or injury.',
        'In addition to health and safety, pruning can also improve the appearance of your trees. A well-pruned tree has a more attractive shape and structure. Pruning can also stimulate flower and fruit production in some species.',
        'Finally, regular pruning can increase the value of your property. Healthy, well-maintained trees are a valuable asset that can enhance the curb appeal and overall value of your home. So, if you haven\'t had your trees pruned recently, now is the time to consider it.'
    ]
  }
];

const projects = [
  {
    slug: 'modern-backyard-retreat',
    image: 'https://picsum.photos/600/400?random=11',
    hint: 'modern backyard',
    title: 'Modern Backyard Retreat',
    description: 'A complete overhaul of a suburban backyard into a modern oasis.',
    details: [
        'New stone patio and walkways',
        'Custom-built pergola and seating area',
        'Drought-tolerant plant selection',
        'Low-voltage landscape lighting',
        'Automated irrigation system'
    ]
  },
  {
    slug: 'lush-front-yard-makeover',
    image: 'https://picsum.photos/600/400?random=12',
    hint: 'front yard',
    title: 'Lush Front Yard Makeover',
    description: 'Transforming a tired front lawn into a vibrant, welcoming garden.',
    details: [
        'Sod removal and soil amendment',
        'Installation of new flower beds',
        'Variety of perennial and annual plantings',
        'Mulching for weed control and moisture retention',
        'New garden path'
    ]
  },
  {
    slug: 'elegant-garden-design',
    image: 'https://picsum.photos/600/400?random=13',
    hint: 'elegant garden',
    title: 'Elegant Garden Design',
    description: 'A classic garden design with a focus on form and color.',
    details: [
        'Boxwood hedges for structure',
        'Rose garden with multiple varieties',
        'Stone fountain as a focal point',
        'Flagstone pathways',
        'Seasonal color displays'
    ]
  },
  {
    slug: 'tree-care-and-removal',
    image: 'https://picsum.photos/600/400?random=14',
    hint: 'large tree',
    title: 'Expert Tree Care and Removal',
    description: 'Safe and efficient removal of a hazardous tree.',
    details: [
        'Hazard assessment and removal plan',
        'Safe removal of a large oak tree',
        'Stump grinding and site cleanup',
        'Pruning of adjacent trees for health and safety',
        'Consultation on replacement tree options'
    ]
  }
];

async function seedCollection(collectionName: string, data: any[]) {
    try {
        console.log(`Seeding ${collectionName}...`);
        for (const item of data) {
            await addDoc(collection(db, collectionName), item);
        }
        console.log(`${collectionName} seeded successfully!`);
    } catch (error) {
        console.error(`Error seeding ${collectionName}:`, error);
    }
}

async function seedDatabase() {
    await seedCollection('blogPosts', blogPosts);
    await seedCollection('projects', projects);
}

seedDatabase();
