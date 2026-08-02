# Quick Card Designer

Quick Card Designer is a completely free, browser-based layout engine tailored for small-format print projects such as flash cards, recipe cards, board game assets, and business cards. Designed with a focus on precision and print-readiness, it bridges the gap between basic text editors and complex publishing software.

[![Quick Card Designer](https://img.shields.io/badge/Quick_Card_Designer-%E2%86%97-007EC6?style=for-the-badge)](https://ajrisi.github.io/quick-card-designer) 

This guide covers everything from basic canvas setup to advanced hardware print calibration and data merging.

## Table of Contents

1. [Workspace Setup](#workspace-setup)  
2. [Adding and Manipulating Elements](#adding-and-manipulating-elements)  
3. [Element Specifics](#element-specifics)  
4. [Two-Sided Design & Ghosting](#two-sided-design--ghosting)  
5. [Data Merging (Batch Generation)](#data-merging-batch-generation)  
6. [Exporting and Saving](#exporting-and-saving)  
7. [The Print Engine & Calibration](#the-print-engine--calibration)  
8. [Keyboard Shortcuts](#keyboard-shortcuts)

## Workspace Setup

Before adding content, establish the physical parameters of your project.

### Units and Sizing

In the top navigation bar, you can toggle your global working unit between Inches (in) and Millimeters (mm). Next to it, select from standard presets (e.g., 3x5, 4x6, Book Sizes) or choose "Custom..." to define your exact dimensions.

*Technical Note:* All number inputs in the application support basic math evaluation. You can type equations like 1/8 or 3+0.25 directly into a width or height field, and the system will automatically compute the decimal value.

### Canvas Orientation and Backgrounds

Toggle between Portrait and Landscape modes using the switch in the top toolbar. You can also apply background patterns to your canvas (Blank, Ruled Lines, or a 0.25" Grid) to assist with layout or to serve as the final printed background.

## Adding and Manipulating Elements

Use the vertical toolbar on the left side of the canvas to inject new elements into your design.

### Selection and Movement

* **Select:** Click any element to select it. To select multiple items, hold Shift and click, or click and drag on the canvas background to create a marquee selection box.  
* **Move:** Drag elements using the grab handle (four-way arrow) that appears above them. Holding Shift while dragging constrains movement to strict horizontal, vertical, or 45-degree diagonal axes.  
* **Precision Movement:** For fine control, hold Ctrl (or Cmd on Mac) while dragging or resizing. This drops the movement speed to 10% for pixel-perfect placement.  
* **Snapping:** When moving a single element, the engine automatically projects alignment lasers and snaps to the edges and centers of other inactive elements on the canvas.

### Resizing and Rotation

* **Resize:** Active elements display 8-way directional resize handles.  
* **Rotate:** Click the rotate icon (curved arrow) above an element to activate rotation handles on its corners. Dragging these handles orbits the element. Holding Shift while rotating snaps the angle to 15-degree increments.

### Alignment and Distribution

When multiple elements are selected, a global control panel appears. You can group elements (Ctrl+G), adjust their Z-Index (bring forward/send backward), and align them.

The alignment engine supports two modes:

* **Box Alignment:** Measures and aligns based on the physical bounding box of the container.  
* **Visual Alignment:** Calculates the exact rendered ink on the screen (ignoring empty padding) to perfectly optically align text and shapes.

## Element Specifics

### Text and Titles

Text elements support inline Markdown formatting. You can use standard syntax for **bold** (\*\*text\*\* or \_\_text\_\_) and *italic* (\*text\* or \_text\_). When you click out of a text block, the markdown is parsed and rendered. The top toolbar provides standard typography controls: font family, size, weight, italic toggle, color, and opacity.

### The Table Engine

Quick Card Designer features a robust custom table engine designed for complex layouts like RPG character sheets or stat blocks.

* **Structure:** Add or remove rows and columns using the \+Row, \-Row, \+Col, and \-Col buttons in the top toolbar.  
* **Resizing:** Hover over the right or bottom edges of a cell to reveal column and row resizers. Drag to resize.  
* **Merging:** Hold Shift and click on a column resizer to merge the current cell with the one to its right. Hold Shift and click on a row resizer to merge down.  
* **Styling:** Tables support global border radius, header row toggles, alternating checkerboard row patterns, and individual cell color overrides. Text alignment can be scoped to the entire table, a specific row, a specific column, or an individual cell.

### Shapes and Dividers

Shapes are rendered as vector SVGs ensuring they remain perfectly sharp at any print resolution.

* Available primitives include Rectangles, Ellipses, Polygons, Lines, and Curves.  
* Depending on the shape, you can adjust corner radius, the number of sides (for polygons), or the arc curve (for curves).  
* Both fill and stroke support distinct hex colors and alpha transparency (opacity).

### Images

Click the Image button to upload local files (PNG, JPG, SVG). Images are automatically constrained to fit the canvas while maintaining their aspect ratio.

## Two-Sided Design & Ghosting

For flash cards or double-sided documents, toggle the "Custom Back" checkbox in the top toolbar. This activates a toggle allowing you to switch between Front and Back editing spaces.

**Ghosting Tool:**

When designing the back of a card, aligning elements with the front is critical. Open the "Ghosting" dropdown menu to enable the reverse side overlay. This projects a translucent copy of the opposite side of the card onto your current workspace. You can flip this projection horizontally (for standard book turning) or vertically (for calendar-style turning) to perfectly match how your printer pulls the paper.

## Data Merging (Batch Generation)

If you are generating a deck of cards, you can automate the process using Data Merging.

1. Select a Text or Title element.  
2. In the top toolbar, look for the Data panel. Click the dropdown and select "+ Upload File..." to load a .csv or .txt file.  
3. Select which column (Col 0, Col 1, etc.) from your data file should be injected into the selected text element.  
4. Toggle "Skip Hdr" if your CSV contains a header row.

**Previewing Data:**

Once data is mapped, a small scrubber appears above the element allowing you to paginate through your records (e.g., 1/50, 2/50) to preview how different text lengths fit your design.

**Data Ghosting:**

In the Ghosting menu, you can enable "Show Data Ghosting." This powerful layout tool renders every single record from your dataset simultaneously at a low opacity. This creates a visual "cloud" of text ink, allowing you to instantly see the maximum and minimum physical bounds your text will occupy across the entire dataset, ensuring no long strings break your layout.

## Exporting and Saving

### Saving as QCD

Click "Save Card" to download your project as a .qcd file. This is a highly specialized SVG file that contains all of your layout data, HTML, custom settings, and embedded images. You can drag and drop this file back into the application, or use the "Open Card" button, to resume editing exactly where you left off.

### Exporting to Raster (PNG)

To generate flat images, open the "Print Layout Options" menu and locate the Raster Resolution section. Select your target DPI (96 for web, 300 for professional print, 600 for ultra-high quality) and click PNG (Front) or PNG (Back). The engine will render a clean, print-ready image.

## The Print Engine & Calibration

Quick Card Designer features a dedicated, hardware-aware print layout engine designed to generate flawless duplex (double-sided) printed sheets directly from your browser. Click "Print Layout Options" to access these features.

### Layout Geometry and Duplexing

* **Paper Size:** Select your physical paper stock (Letter, A4, Legal). The engine will automatically calculate how many cards fit on a single sheet.  
* **Grid Gaps:** Define the physical spacing (gutters) between cards on the sheet.  
* **Generate 2nd Page for Duplex:** When checked, clicking Print will generate a physical layout for the front, followed immediately by a mathematically mirrored layout for the back.  
* **Duplex Reversal:** The engine defaults to reversing columns left-to-right for the back page, which maps perfectly to standard long-edge printer duplexing.

### Bleed and Margins

* **Margins:** Set internal padding (Top, Right, Bottom, Left).  
* **Bleed:** Define an edge extension. If your card has a background color or pattern, it will extend beyond the physical cut line by this amount, preventing white slivers when cutting physically.  
* **Cut/Safe Lines & Crop Marks:** You can independently enable external crop marks, internal cut lines (dashed), and internal safe margin lines to guide your physical cutting tools.

### Hardware Calibration (The Vernier Scale)

Home and office printers often suffer from mechanical paper feed drift, where the back side of a page prints slightly offset from the front.

1. Check "Print Vernier Caliper Scale (Duplex)" in the Print Layout Options.  
2. Click Print. You will notice a crosshair graphic added to your sheet.  
3. Print the document double-sided.  
4. Hold the physical printed sheet up to a strong light source.  
5. Look at the Vernier scale. Find the specific tick mark where the lines on the front of the page perfectly overlap the lines on the back of the page.  
6. Enter that overlapping number into the "X Offset" or "Y Offset" inputs in the Print Layout Options.  
7. The software will automatically shift the mathematical grid for all future prints on your specific hardware, neutralizing the mechanical drift.

## Keyboard Shortcuts

| Shortcut | Action |
| :---- | :---- |
| Ctrl \+ Z / Cmd \+ Z | Undo |
| Ctrl \+ Y / Cmd \+ Y | Redo |
| Ctrl \+ C / Cmd \+ C | Copy Selection |
| Ctrl \+ X / Cmd \+ X | Cut Selection |
| Ctrl \+ V / Cmd \+ V | Paste (Centers on mouse cursor) |
| Ctrl \+ G / Cmd \+ G | Group selected elements |
| Ctrl \+ Shift \+ G | Ungroup selected elements |
| Delete / Backspace | Delete active element(s) |
| Shift \+ Drag | Lock movement to straight lines / Snap rotation to 15 deg |
| Ctrl \+ Drag | Precision drag mode (10% speed) |
| Shift \+ Click | Multi-select / Merge table cells (when clicking resizers) |

## Support the Developer

Quick Card Designer is built and maintained as a free tool for the community. If this software has saved you time, helped you prototype a game, or made your layout process easier, please consider supporting its continued development.

You can leave a tip via PayPal here:

[**paypal.me/serenitynowbrc**](https://paypal.me/serenitynowbrc)

Thank you for designing with us\!
