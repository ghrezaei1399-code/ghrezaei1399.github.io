from pypdf import PdfReader
Article Reader Agent
وظیفه:
1- فقط فایل‌های مقاله را پردازش می‌کند.
2- کتاب، پوستر، داستان، یادداشت، فیلم و ... را نادیده می‌گیرد.
3- خروجی فقط مربوط به همان مقاله است.
4- هر مقاله خروجی‌های خودش را با همان نام تولید می‌کند.

این عامل فعلاً فقط مسئول «مقاله» است.
"""
ARTICLE_TYPE = {
    "name": "مقاله",
    "input": "PDF مقاله",
    "output": "پرونده هوشمند همان مقاله",
    "rule": [
        "فقط مقاله را پردازش کن.",
        "اگر فایل مقاله نیست، متوقف شو.",
        "از نام واقعی فایل به عنوان شناسه استفاده کن.",
        "تمام خروجی‌ها باید با همان نام مقاله ذخیره شوند.",
        "هیچ داده‌ای را با مقاله دیگر مخلوط نکن."
    ]
}
def is_article(file_name: str) -> bool:
    """
    تشخیص اینکه آیا فایل ورودی یک مقاله است یا خیر.
    فعلاً قانون ساده است:
    اگر نام فایل شامل کلمه «مقاله» باشد، مقاله است.
    """
    return "مقاله" in file_name
def article_output_name(file_name: str) -> str:
    """
    نام پرونده هوشمند را از روی نام واقعی مقاله تولید می‌کند.
    """
    if file_name.lower().endswith(".pdf"):
        return file_name[:-4] + ".ai.json"
    return file_name + ".ai.json"
    ARTICLE_MISSION = {
    "ورودی": "فقط یک فایل مقاله",
    "وظیفه": "درک مقاله، نه فقط خواندن آن",
    "هدف": "تبدیل مقاله به پرونده هوشمند",
    "استخراج": [
        "عنوان",
        "چکیده",
        "هفت داده استاندارد",
        "خروجی‌های مخصوص مقاله"
    ],
    "ممنوع": [
        "پردازش کتاب",
        "پردازش پوستر",
        "پردازش داستان",
        "حدس زدن نوع فایل"
    ]
}
    from pathlib import Path


def find_article(file_name: str):
    """
    فایل مقاله را با نام واقعی پیدا می‌کند.
    """
    article = Path(file_name)

    if not article.exists():
        raise FileNotFoundError(f"مقاله پیدا نشد: {file_name}")

    if not is_article(article.name):
        raise ValueError("این فایل مقاله نیست.")

    return article


if __name__ == "__main__":

    ARTICLE_NAME = "مقاله و چکیده ی مقاله هوشمندسازی همراهان روشنایی.pdf"

    article = find_article(ARTICLE_NAME)

    print("OK")
    print(article.name)
    def run(article_name: str):

    article = find_article(article_name)

    output_name = article_output_name(article.name)

    print("===================================")
    print("Article :", article.name)
    print("Output  :", output_name)
    print("Status  : READY")
    print("===================================")


if __name__ == "__main__":

    ARTICLE_NAME = "مقاله و چکیده ی مقاله هوشمندسازی همراهان روشنایی.pdf"

    run(ARTICLE_NAME)
    import json


def create_smart_file(article_name: str):

    output_name = article_output_name(article_name)

    data = {
        "article_name": article_name,
        "article_type": "مقاله",
        "status": "NEW",
        "summary": "",
        "seven_factors": {},
        "outputs": {}
    }

    with open(output_name, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    return output_name


if __name__ == "__main__":
text = extract_text(ARTICLE_NAME)

print("Characters :", len(text))

print(text[:1000])
    ARTICLE_NAME = "مقاله و چکیده ی مقاله هوشمندسازی همراهان روشنایی.pdf"

    run(ARTICLE_NAME)

    smart_file = create_smart_file(ARTICLE_NAME)

    print("Smart File :", smart_file)
    def extract_text(article_name: str):

    reader = PdfReader(article_name)

    text = ""

    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"

    return text
    
