
import sys
try:
    from pypdf import PdfReader
    print("pypdf is installed")
    reader = PdfReader("The+Martian+(+PDFDrive+)_20201004000111.pdf")
    page = reader.pages[0]
    text = page.extract_text()
    if text.strip():
        print("Text found:", text[:100])
    else:
        print("No text found on page 1")
except ImportError:
    print("pypdf not installed")
except Exception as e:
    print(f"Error: {e}")
