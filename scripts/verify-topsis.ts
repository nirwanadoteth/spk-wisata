import { INITIAL_ALTERNATIVES } from "../lib/spk-data";
import { calculateTOPSIS } from "../lib/topsis";

console.log("Running TOPSIS Verification...");

const result = calculateTOPSIS(INITIAL_ALTERNATIVES);

console.log("Top 3 Results:");
result.alternatives.slice(0, 3).forEach((alt, index) => {
  console.log(`${index + 1}. ${alt.name} (Score: ${alt.score?.toFixed(5)})`);
});

const winner = result.alternatives[0];
if (winner.name === "Kawah Putih") {
  console.log("\nPASS: Kawah Putih is ranked #1.");
} else {
  console.error(
    `\nFAIL: Expected Kawah Putih to be #1, but got ${winner.name}.`
  );
  process.exit(1);
}
