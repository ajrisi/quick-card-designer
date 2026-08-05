import re
import urllib.request
import sys
import os

def process_html_file(input_path, output_path):
    # Read the original HTML file
    try:
        with open(input_path, 'r', encoding='utf-8') as f:
            html_content = f.read()
    except FileNotFoundError:
        print(f"Error: Could not find file '{input_path}'")
        return

    # Determine the absolute directory of the input file so we can resolve relative paths
    input_dir = os.path.dirname(os.path.abspath(input_path))

    # Regex to capture the full <script> tag, its attributes, and closing tag
    # re.DOTALL ensures (.*?) captures any newlines/whitespace inside the tag
    script_pattern = re.compile(r'(<script\b([^>]*)>)(.*?)(</script>)', re.IGNORECASE | re.DOTALL)

    def injection_replacer(match):
        attributes = match.group(2)
        closing_tag = match.group(4)

        # Look for the standalone 'inject' attribute and the 'src' attribute
        if re.search(r'\binject\b', attributes) and 'src=' in attributes:
            src_match = re.search(r'src=["\'](.*?)["\']', attributes)
            
            if src_match:
                src = src_match.group(1)
                js_content = ""
                
                try:
                    # Branch logic based on whether the src is remote or local
                    if src.startswith(('http://', 'https://')):
                        print(f"Downloading remote script from: {src}")
                        req = urllib.request.Request(src, headers={'User-Agent': 'Mozilla/5.0'})
                        with urllib.request.urlopen(req) as response:
                            js_content = response.read().decode('utf-8')
                    else:
                        local_path = os.path.normpath(os.path.join(input_dir, src))
                        print(f"Reading local script from: {local_path}")
                        with open(local_path, 'r', encoding='utf-8') as js_file:
                            js_content = js_file.read()

                    # Remove 'inject' and 'src="url"' from the tag's attributes
                    clean_attrs = re.sub(r'\binject\b', '', attributes)
                    clean_attrs = re.sub(r'src=["\'].*?["\']', '', clean_attrs)
                    
                    # Clean up any awkward whitespace/newlines left behind by the removal
                    clean_attrs = re.sub(r'\s+', ' ', clean_attrs).rstrip()

                    # Return the newly constructed inline <script> tag
                    # This inherently overwrites whatever whitespace/content was inside match.group(3)
                    return f"<script{clean_attrs}>\n{js_content}\n{closing_tag}"
                
                except Exception as e:
                    print(f"  -> Failed to resolve or inject '{src}': {e}")
                    return match.group(0) # Return the original unmodified tag if it fails

        # Return original tag if it doesn't meet the criteria
        return match.group(0)

    # Execute the replacement logic on the HTML content
    injected_html = script_pattern.sub(injection_replacer, html_content)

    # Safely ensure the output directory exists (e.g., if output is "build/index.html")
    output_dir = os.path.dirname(os.path.abspath(output_path))
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)
        
    # Save the modified HTML to the new output path
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(injected_html)
    
    print(f"\nSuccess! Modified HTML saved to: {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python injector.py <input_html_file> <output_html_file>")
    else:
        process_html_file(sys.argv[1], sys.argv[2])
