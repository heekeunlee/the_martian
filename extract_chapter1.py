
from pypdf import PdfReader

def extract_chapter1():
    try:
        reader = PdfReader("The+Martian+(+PDFDrive+)_20201004000111.pdf")
        text = ""
        # Pages 9 to 13 (indices 8 to 12)
        for i in range(8, 13): 
            text += reader.pages[i].extract_text() + "\n"
        
        with open("chapter1_raw.txt", "w", encoding="utf-8") as f:
            f.write(text)
        print("Extraction complete. Check chapter1_raw.txt")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_chapter1()
