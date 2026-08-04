# Quick Card Designer

Quick Card Designer is a completely free, browser-based layout engine tailored for small-format print projects such as flash cards, recipe cards, board game assets, and business cards. Designed with a focus on precision and print-readiness, it bridges the gap between basic text editors and complex publishing software.

[![Quick Card Designer](https://img.shields.io/badge/Quick_Card_Designer-%E2%86%97-007EC6?style=for-the-badge)](https://ajrisi.github.io/quick-card-designer) 

This guide covers everything from basic canvas setup to advanced hardware print calibration and automated data merging.

## Table of Contents

1. [Workspace Setup](#workspace-setup)  
2. [Adding and Manipulating Elements](#adding-and-manipulating-elements)  
3. [Element Specifics](#element-specifics)  
4. [Two-Sided Design & Ghosting](#two-sided-design--ghosting)  
5. [Data Merging (Batch Generation)](#data-merging-batch-generation)  
6. [Exporting and Saving](#exporting-and-saving)  
7. [The Print Engine & Calibration](#the-print-engine--calibration)  
8. [Keyboard Shortcuts](#keyboard-shortcuts)

---

## Workspace Setup

Before adding content, establish the physical parameters of your project.

### Units, Sizing, and DPI
* **Units:** In the top navigation bar, you can toggle your global working unit between Inches (in) and Millimeters (mm). 
* **Doc DPI:** This controls the physical pixel density of your working canvas (100, 300, or 600 DPI). If you change this mid-project, the engine will automatically scale all your elements to match the new density.
* **Size:** Select from standard presets (e.g., Poker, Tarot, 4x6, Book Sizes) or choose "Custom..." to define your exact dimensions.
* **Orientation:** Toggle between Portrait and Landscape modes using the switch in the top toolbar. 

### Smart Number Inputs
This is a huge time-saver: **almost every number input in the app supports math**. 
* Instead of calculating decimals in your head, type equations like `3+1/8` or `10/3` directly into a width or height field and hit Enter to compute the value.
* When focused on a number input, using the `Up/Down` arrow keys or scrolling your mouse wheel will step the value up or down. 
* **Pro-tip:** Hold `Shift` while scrolling or using the arrow keys to jump the value by 10x!

### Canvas Backgrounds
Click the "Pattern" dropdown to apply backgrounds to your canvas (Blank, Ruled Lines, Grid, or Dotted). Click the settings gear to tweak the line color, thickness, grid size, or even tell Ruled Lines to "Skip Top Lines" to leave room for a header.

---

## Adding and Manipulating Elements

Use the vertical toolbar on the left side of the canvas to inject new elements or open your Asset Banks.

### Selection and Movement
* **Select:** Click any element to select it. To select multiple items, hold `Shift` and click, or click and drag on the canvas background to create a marquee selection box.  
* **Move:** Drag elements using the grab handle (four-way arrow) that appears above them. Holding `Shift` while dragging constrains movement to strict horizontal, vertical, or 45-degree diagonal axes.  
* **Precision Movement:** For fine control, hold `Ctrl` (or `Cmd` on Mac) while dragging or resizing. This drops the movement speed to 10% for pixel-perfect placement.  
* **Snapping:** While dragging, the engine automatically projects alignment lasers and snaps to the edges and centers of the canvas and other inactive elements. You can toggle drag snapping, resize snapping, and lasers in the "Snapping" dropdown.

### The Multi-Select Popover
When you select multiple items, a floating popover menu appears. If it's covering your design, grab the dotted handle on the far right of the popover and drag it—it will automatically snap to the nearest corner of your selection box. From here you can group elements (`Ctrl+G`), toggle lasers, rotate the entire group, or adjust the Z-Index.

### Resizing and Rotation
* **Resize:** Active elements display 8-way directional resize handles.  
* **Rotate:** Click the rotate icon (curved arrow) above an element to activate rotation handles on its corners. Dragging these handles orbits the element. Holding `Shift` while rotating snaps the angle to 15-degree increments.

### Alignment: Box vs. Visual
In the top toolbar's alignment section, you'll see a dropdown with "Box" and "Vis".
* **Box (Bounding Box):** Measures and aligns based on the absolute physical edges of the container.
* **Vis (Visual Ink):** Calculates the exact rendered text ink on the screen (ignoring empty padding). Use this when you want a piece of text to look perfectly, optically centered relative to a shape.

---

## Element Specifics

### Text and Titles
Text elements support inline Markdown formatting. You can use standard syntax for **bold** (`**text**` or `__text__`) and *italic* (`*text*` or `_text_`). When you click out of a text block, the markdown is parsed and rendered. The top toolbar provides standard typography controls, plus a "Justify" dropdown that lets you force text justification by word (`inter-word`) or by character (`inter-character`).

### Shapes and Dividers
Shapes are rendered as vector SVGs ensuring they remain perfectly sharp at any print resolution.
* Available primitives include Rectangles, Ellipses, Polygons, Lines, and Curves.  
* The top toolbar updates dynamically based on the shape. You can adjust Corner Radius (rectangles), Number of Sides (polygons), or the Arc Curve (curves).  
* Both fill and stroke support distinct hex colors and alpha transparency (opacity).

### The Table Engine
Quick Card Designer features a robust custom table engine designed for complex layouts like RPG character sheets or stat blocks.
* **Structure:** Add or remove rows and columns using the `+Row`, `-Row`, `+Col`, and `-Col` buttons in the top toolbar.  
* **Resizing:** Hover over the right or bottom edges of a cell to reveal blue column and row resizers. Drag to resize.  
* **Merging:** Hold `Shift` and click on a column resizer to merge the current cell with the one to its right. Hold `Shift` and click on a row resizer to merge down.  
* **Styling:** Open the "Table Styles" menu to configure a Header row (with custom background color) or enable an alternating Checkerboard row pattern. Use the "Cell Fill" color picker to apply a custom background color to specific cells. Text alignment can be scoped to the entire table, a specific row, a specific column, or an individual cell.

### Images & The Image Bank
Click "Images" to open the Document Image Bank. This acts as a central repository for your project's assets so you don't have to upload the same image twice.
* **Image Controls:** Once an image is on the canvas, use the top toolbar to adjust its Fit (Contain, Fill, Cover, Original), exact X/Y alignment within its box, and Scale.
* **Color to Alpha (C2A):** Open the "Color to Alpha" menu to pick a target color (e.g., a white background on a JPG) and adjust the tolerance slider to instantly turn that color transparent.

---

## Two-Sided Design & Ghosting

For flash cards or double-sided documents, toggle the "Custom Back" checkbox in the top toolbar. This activates a toggle allowing you to switch between Front and Back editing spaces.

**The Ghosting Tool:**
Aligning elements perfectly across physical sheets is tricky. Open the "Ghosting" dropdown to enable visual overlays:
* **Show Reverse Side:** Projects a translucent copy of the *opposite* side of the card onto your current workspace. You can flip this projection horizontally (for standard book turning) or vertically (for calendar-style turning) to match how your printer pulls the paper.
* **Show Data Ghosting:** If you are using Data Merging, this renders *every single record* from your CSV simultaneously at a low opacity. This creates a visual "cloud" of text ink, allowing you to instantly see the maximum physical bounds your text will occupy across the entire dataset without having to click through every record.

---

## Data Merging (Batch Generation)

If you are generating a deck of cards, you can automate the process using Data Merging.

1. Open the "Data" modal and click "+ Upload CSV" to load a `.csv` or `.txt` file. The engine automatically detects headers.
2. Select a Text or Image element on your canvas.
3. In the top toolbar, use the "Link Data" dropdown to select your CSV source, then pick the specific column.
4. A scrubber will appear in your floating toolbar, allowing you to paginate through your records (e.g., 1/50, 2/50) to preview how different data fits your design.

### Linking Images via CSV
You can drive canvas images directly from your CSV! 
1. In your CSV file, name the column header starting with `Images:` (e.g., `Images: Character Portraits`).
2. In the cells below, type the exact filename of the image (e.g., `warrior.png`). 
3. When you load the CSV, the Image Bank will automatically detect these filenames. If the images haven't been uploaded yet, they will show up in the Image Bank under a red "Missing from CSV" warning. You can click "Fulfill" to upload the missing image file directly to that slot.

---

## Exporting and Saving

### Saving as QCD
Click "Save Card" to download your project as a `.qcd` file. This is a highly specialized SVG file that contains all of your layout data, settings, and embedded images. You can drag and drop this file back into the application, or use the "Open Card" button, to resume editing exactly where you left off.

### Exporting to Raster (PNG)
To generate flat images, open the "Export" menu. Select your target DPI (96 for web, 300 for professional print, 600 for ultra-high quality). You can export the "Current Face" or "Both Faces" as single flat PNGs, or export fully paginated PNG sheets of your entire data batch using the "Full Sheet Export" tools.

---

## The Print Engine & Calibration

Quick Card Designer features a dedicated, hardware-aware print layout engine designed to generate flawless duplex (double-sided) printed sheets directly from your browser. Click **Print** in the top right to access these features.

### Layout Geometry and Duplexing
* **Sheet Setup:** Select your physical paper stock (Letter, A4, Legal, etc.). The engine will automatically calculate how many cards fit on a single sheet.  
* **Grid Gaps:** Define the physical spacing (gutters) between cards on the sheet.  
* **Generate 2nd Page for Duplex:** When checked, clicking Print will generate a physical layout for the front, followed immediately by a mathematically mirrored layout for the back.  
* **Duplex Reversal:** The engine defaults to reversing columns left-to-right for the back page, which maps perfectly to standard long-edge printer duplexing.

### Bleed and Margins
* **Margins:** Set internal padding (Top, Right, Bottom, Left).  
* **Bleed:** Define an edge extension. If your card has a background color or pattern, it will extend beyond the physical cut line by this amount, preventing white slivers when cutting physically.  
* **Guides & Marks:** You can independently enable external crop marks, internal corner dots, card cut edges, or binding margin guides to guide your physical cutting tools. Colors and line styles are fully customizable.

### Printer Hardware Calibration (The Vernier Scale)
Home and office printers often suffer from mechanical paper feed drift, where the back side of a page prints slightly offset from the front.

1. Check **Print Vernier Caliper Scale (Duplex)** in the Print Options.  
2. Click Print. You will notice a draggable crosshair graphic added to your sheet.  
3. Print the document double-sided.  
4. Hold the physical printed sheet up to a strong light source.  
5. Look at the Vernier scale. Find the specific tick mark where the lines on the front of the page perfectly overlap the lines on the back of the page.  
6. Enter that overlapping number into the **X Offset** or **Y Offset** inputs in the Print Options.  
7. The software will automatically shift the mathematical grid for all future prints on your specific hardware, neutralizing the mechanical drift!

---

## Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + Z` / `Cmd + Z` | Undo |
| `Ctrl + Y` / `Cmd + Y` | Redo |
| `Ctrl + C` / `Cmd + C` | Copy Selection |
| `Ctrl + X` / `Cmd + X` | Cut Selection |
| `Ctrl + V` / `Cmd + V` | Paste (Centers on mouse cursor) |
| `Ctrl + G` / `Cmd + G` | Group selected elements |
| `Ctrl + Shift + G` | Ungroup selected elements |
| `Delete` / `Backspace` | Delete active element(s) |
| `Shift + Drag` | Lock movement to straight lines |
| `Shift + Rotate` | Snap rotation to 15-degree increments |
| `Ctrl + Drag` | Precision drag/resize mode (10% speed) |
| `Shift + Scroll Wheel` | Jump number input values by 10x increments |
| `Shift + Click` (Resizers) | Merge table cells horizontally or vertically |

---

## Support the Developer

Quick Card Designer is built and maintained as a free tool for the community. If this software has saved you time, helped you prototype a game, or made your layout process easier, please consider supporting its continued development.

You can leave a tip via PayPal here:

[**paypal.me/serenitynowbrc**](https://paypal.me/serenitynowbrc)

Thank you for designing with us!