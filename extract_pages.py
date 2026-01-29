
from pypdf import PdfReader
import json

def extract_pages():
    try:
        reader = PdfReader("the_martian.pdf") # Using the file user specified, though it seems to be the same file
        pages_content = []
        
        # Extract Pages 9 to 13 (Chapter 1)
        # In PDF terms, indices 8 to 12
        start_page = 8
        end_page = 13
        
        for i in range(start_page, end_page): 
            text = reader.pages[i].extract_text()
            pages_content.append({
                "pageIndex": i, # 0-based index from PDF
                "displayPage": i + 1, # 1-based index for display
                "text": text
            })
        
        with open("chapter1_pages_raw.json", "w", encoding="utf-8") as f:
            json.dump(pages_content, f, ensure_ascii=False, indent=2)
            
        print(f"Extracted {len(pages_content)} pages to chapter1_pages_raw.json")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract_pages()
