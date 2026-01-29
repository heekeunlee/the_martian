
from pypdf import PdfReader

def extract_intro():
    try:
        reader = PdfReader("The+Martian+(+PDFDrive+)_20201004000111.pdf")
        text = ""
        for i in range(20): # Check first 20 pages
            text += f"\n--- Page {i+1} ---\n"
            text += reader.pages[i].extract_text()
        
        with open("intro_text.txt", "w", encoding="utf-8") as f:
            f.write(text)
        print("Extraction complete. Check intro_text.txt")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_intro()
