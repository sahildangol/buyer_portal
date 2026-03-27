import prisma from "../src/config/db";

const sampleProperties = [
  {
    title: "Modern Downtown Apartment",
    description:
      "2 bed, 2 bath apartment close to the city center with balcony views.",
    price: 325000,
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Cozy Family House",
    description:
      "Spacious 3 bedroom home in a quiet neighborhood with a private backyard.",
    price: 460000,
    imageUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Suburban Villa",
    description:
      "4 bed villa featuring a garden, garage, and open-plan living room.",
    price: 615000,
    imageUrl:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Waterfront Condo",
    description:
      "Premium condo with direct waterfront access and panoramic windows.",
    price: 780000,
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Minimal Studio Loft",
    description:
      "Compact and efficient loft ideal for single professionals or couples.",
    price: 245000,
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  },
];

const seedProperties = async () => {
  for (const property of sampleProperties) {
    const existingProperty = await prisma.property.findFirst({
      where: {
        title: property.title,
      },
      select: {
        id: true,
      },
    });

    if (!existingProperty) {
      await prisma.property.create({
        data: property,
      });
    }
  }
};

const runSeed = async () => {
  await seedProperties();
  console.log("Properties seeded successfully");
};

runSeed()
  .catch((error) => {
    console.error("Seeding failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
