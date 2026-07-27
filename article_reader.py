from pathlib import Path

print("=== Article Reader Agent ===")

pdf_files = list(Path(".").glob("*.pdf"))

if not pdf_files:
    print("No PDF article found.")
else:
    print("Found article:")
    for pdf in pdf_files:
        print("-", pdf.name)
