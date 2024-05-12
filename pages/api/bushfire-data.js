import fs from "fs";
import Papa from "papaparse";
import path from "path";

export default function handler(req, res) {
  const filePath = path.resolve("./public", "output_bushfire.csv");
  fs.readFile(filePath, "utf8", (err, csvStr) => {
    if (err) {
      console.error("Error reading the CSV file:", err);
      return res.status(500).json({ error: "Failed to read the CSV file" });
    }

    Papa.parse(csvStr, {
      header: true,
      complete: (results) => {
        res.status(200).json(results.data);
      },
      error: (error) => {
        console.error("Error parsing the CSV:", error);
        res.status(500).json({ error: "Error parsing the CSV data" });
      },
    });
  });
}
