const { PrismaClient } = require('@prisma/client');
const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Grammar" },
                { name: "Vocabulary" },
                { name: "Conditional Sentence" },
                { name: "Relative Clause" },
                { name: "Passive Voice" },
                { name: "Gerunds" },
                { name: "Infinitives" },
            ],
        });

        console.log("Success");
    } catch (error) {
        console.log("Error seeding the database category", error);
    } finally {
        await database.$disconnect();
    }
}

// Run the seeding function
main();
