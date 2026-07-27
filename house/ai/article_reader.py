from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]


def find_articles():

    pdfs = sorted(PROJECT_ROOT.glob("*.pdf"))

    print("=" * 40)
    print("AI Article Reader")
    print("=" * 40)

    if len(pdfs) == 0:
        print("No PDF article found.")
        return

    print(f"{len(pdfs)} article(s) found:\n")

    for i, pdf in enumerate(pdfs, start=1):
        print(f"{i}. {pdf.stem}")


if __name__ == "__main__":
    find_articles()
