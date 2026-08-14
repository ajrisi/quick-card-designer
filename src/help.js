/**
 * Quick Card Designer - Help Menu Injection Script
 * Binds to the existing #info-btn and adds a comprehensive Help Modal to the DOM.
 */

(function() {
    const style = document.createElement('style');
    style.innerHTML = `
        /* Custom Scrollbar for the modal content */
        .help-custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .help-custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .help-custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
        .help-custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
        
        /* Keyboard Shortcut Key Styling */
        kbd.help-kbd {
            background-color: #f8fafc;
            border: 1px solid #cbd5e1;
            border-bottom-width: 2px;
            border-radius: 4px;
            padding: 2px 6px;
            font-size: 0.75rem;
            font-weight: 600;
            color: #475569;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        }

        /* Tab Fade Animation */
        @keyframes helpFadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .help-animate-fade-in {
            animation: helpFadeIn 0.3s ease forwards;
        }
    `;
    document.head.appendChild(style);

    const modalHtml = `
    <!-- Full-Screen Modal Wrapper -->
    <div id="help-wrapper" class="fixed inset-0 z-[99999] hidden items-center justify-center px-4 pointer-events-auto" style="font-family: 'Inter', system-ui, sans-serif;">
        
        <!-- Backdrop -->
        <div id="help-backdrop" class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm opacity-0 transition-opacity duration-300" onclick="closeHelpModal()"></div>
        
        <!-- Modal Container -->
        <div id="help-modal" class="relative w-full max-w-4xl h-[80vh] max-h-[700px] bg-white rounded-2xl shadow-2xl flex overflow-hidden opacity-0 scale-95 translate-y-4 transition-all duration-300">
            
            <!-- Sidebar Navigation -->
            <div class="w-64 bg-gray-50 border-r border-gray-200 flex flex-col shrink-0">
                <div class="p-5 border-b border-gray-200 flex items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h2 class="text-base font-bold text-gray-800 tracking-tight">Quick Help</h2>
                </div>
                
                <nav class="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
                    <button onclick="switchHelpTab('tab-ui')" id="nav-ui" class="help-nav-btn w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-blue-700 bg-blue-50">
                        <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
                        Interface Guide
                    </button>
                    <button onclick="switchHelpTab('tab-doc')" id="nav-doc" class="help-nav-btn w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                        <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        Document Setup
                    </button>
                    <button onclick="switchHelpTab('tab-templates')" id="nav-templates" class="help-nav-btn w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                        <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                        Using Templates
                    </button>
                    <button onclick="switchHelpTab('tab-data')" id="nav-data" class="help-nav-btn w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                        <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
                        CSV & Plugins
                    </button>
                    <button onclick="switchHelpTab('tab-print')" id="nav-print" class="help-nav-btn w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                        <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                        Export & Print
                    </button>
                    <button onclick="switchHelpTab('tab-shortcuts')" id="nav-shortcuts" class="help-nav-btn w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                        <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                        Keyboard Shortcuts
                    </button>
                    <button onclick="switchHelpTab('tab-about')" id="nav-about" class="help-nav-btn w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900">
                        <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        About & Support
                    </button>
                </nav>
            </div>

            <!-- Content Area -->
            <div class="flex-1 flex flex-col relative bg-white">
                <!-- Close Button -->
                <button onclick="closeHelpModal()" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors z-10">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <div class="flex-1 overflow-y-auto help-custom-scrollbar p-8">
                    
                    <!-- TAB 1: USER INTERFACE -->
                    <div id="tab-ui" class="help-tab block help-animate-fade-in">
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Interface Guide</h3>

                        <div class="space-y-6">
                            <!-- Long Press -->
                            <div class="flex gap-4 items-start">
                                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-blue-600 mt-1">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
                                </div>
                                <div>
                                    <h4 class="text-lg font-bold text-gray-800 mb-1">Click & Hold Menus</h4>
                                    <p class="text-sm text-gray-600 mb-2">Many toolbar buttons have secondary options. <strong>Click and hold for half a second</strong> to reveal a dropdown menu. Try this on:</p>
                                    <div class="flex flex-wrap gap-2 mt-2">
                                        <span class="bg-gray-50 border border-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-semibold shadow-sm">New Card</span>
                                        <span class="bg-gray-50 border border-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-semibold shadow-sm">Open Card</span>
                                        <span class="bg-gray-50 border border-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-semibold shadow-sm">+ Add Data</span>
                                        <span class="bg-gray-50 border border-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-semibold shadow-sm">+ Add Image</span>
                                        <span class="bg-gray-50 border border-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-semibold shadow-sm">+ Add Plugin</span>
                                    </div>
                                </div>
                            </div>

                            <hr class="border-gray-100">

                            <!-- Floating Toolbar -->
                            <div>
                                <h4 class="text-lg font-bold text-gray-800 mb-3">Floating Element Toolbar</h4>
                                <p class="text-sm text-gray-600 mb-4">When you select an element on the canvas, a quick-action toolbar appears.</p>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div class="border border-gray-200 rounded-lg p-3 bg-white shadow-sm flex items-start gap-3">
                                        <span class="bg-gray-50 text-gray-600 p-1.5 rounded border border-gray-200 shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v20M2 12h20M9 5l3-3 3 3M9 19l3 3 3-3M5 9l-3 3 3 3M19 9l3 3-3 3"></path></svg></span>
                                        <div><strong class="text-sm text-gray-800 block">Move Handle</strong><span class="text-xs text-gray-500 block">Drag here to move the selection securely.</span></div>
                                    </div>
                                    <div class="border border-gray-200 rounded-lg p-3 bg-white shadow-sm flex items-start gap-3">
                                        <span class="bg-gray-50 text-gray-600 p-1.5 rounded border border-gray-200 shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></span>
                                        <div><strong class="text-sm text-gray-800 block">Rotation Mode</strong><span class="text-xs text-gray-500 block">Toggles corner handles for free-rotation.</span></div>
                                    </div>
                                    <div class="border border-gray-200 rounded-lg p-3 bg-white shadow-sm flex items-start gap-3">
                                        <span class="bg-gray-50 text-gray-600 p-1.5 rounded border border-gray-200 shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4v16M16 4v16M4 8h16M4 16h16"></path></svg></span>
                                        <div><strong class="text-sm text-gray-800 block">Alignment Lasers</strong><span class="text-xs text-gray-500 block">Turns on persistent crosshairs for lining things up.</span></div>
                                    </div>
                                    <div class="border border-gray-200 rounded-lg p-3 bg-white shadow-sm flex items-start gap-3">
                                        <span class="bg-gray-50 text-gray-600 p-1.5 rounded border border-gray-200 shrink-0"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path></svg></span>
                                        <div><strong class="text-sm text-gray-800 block">Layering (Z-Index)</strong><span class="text-xs text-gray-500 block">Moves the element forward or backward. Hover to preview.</span></div>
                                    </div>
                                </div>
                            </div>

                            <hr class="border-gray-100">

                            <!-- Precision Snapping -->
                            <div>
                                <h4 class="text-lg font-bold text-gray-800 mb-3">Precision Snapping</h4>
                                <p class="text-sm text-gray-600 mb-4">Keep your layout pixel-perfect using the <strong>Snapping</strong> menu in the top toolbar.</p>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div class="border border-gray-200 rounded-xl p-3 bg-white shadow-sm flex items-start gap-3 border-l-4 border-l-emerald-500 hover:shadow-md transition-shadow">
                                        <div class="mt-0.5"><strong class="text-sm text-gray-800 block">Drag & Resize Snap</strong><span class="text-xs text-gray-500 block leading-relaxed mt-1">Elements magnetically align to the page center, document margins, and the boundaries of other elements while moving or resizing.</span></div>
                                    </div>
                                    <div class="border border-gray-200 rounded-xl p-3 bg-white shadow-sm flex items-start gap-3 border-l-4 border-l-emerald-500 hover:shadow-md transition-shadow">
                                        <div class="mt-0.5"><strong class="text-sm text-gray-800 block">Snap Lasers</strong><span class="text-xs text-gray-500 block leading-relaxed mt-1">Displays bright green persistent guidelines while dragging so you know exactly what boundary you are actively aligning to.</span></div>
                                    </div>
                                    <div class="border border-gray-200 rounded-xl p-3 bg-white shadow-sm flex items-start gap-3 md:col-span-2 border-l-4 border-l-emerald-500 hover:shadow-md transition-shadow">
                                        <div class="mt-0.5"><strong class="text-sm text-gray-800 block flex items-center gap-2">Cross-Side Snapping <span class="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-gray-200">Pro Feature</span></strong><span class="text-xs text-gray-500 block leading-relaxed mt-1">Enable this to snap elements on the Front face directly to the calculated bounding boxes of elements on the Back face. Perfect for ensuring that double-sided print graphics overlap perfectly when held up to the light!</span></div>
                                    </div>
                                </div>
                            </div>

                            <hr class="border-gray-100">

                            <!-- Ghosting & Overlays -->
                            <div>
                                <h4 class="text-lg font-bold text-gray-800 mb-3">Ghosting & Overlays</h4>
                                <p class="text-sm text-gray-600 mb-4">Visualize hidden information directly on the canvas via the <strong>Ghosting</strong> menu in the top toolbar.</p>
                                
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div class="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden flex flex-col">
                                        <div class="bg-amber-50 p-3 border-b border-gray-100 flex items-center gap-2">
                                            <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                                            <strong class="text-sm text-amber-900">Reverse Side</strong>
                                        </div>
                                        <div class="p-3 text-xs text-gray-600 flex-1 leading-relaxed">
                                            Projects a faint, flipped overlay of the opposite face. Adjust the opacity and choose between a <strong>Horizontal (Book)</strong> or <strong>Vertical (Calendar)</strong> flip style to match your physical print layout.
                                        </div>
                                    </div>
                                    <div class="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden flex flex-col">
                                        <div class="bg-blue-50 p-3 border-b border-gray-100 flex items-center gap-2">
                                            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                            <strong class="text-sm text-blue-900">Data Ghosting</strong>
                                        </div>
                                        <div class="p-3 text-xs text-gray-600 flex-1 leading-relaxed">
                                            Overlays faint versions of <strong>every record</strong> in your dataset simultaneously. Essential for stress-testing layouts to see if extremely long names will overflow your text boxes.
                                        </div>
                                    </div>
                                    <div class="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden flex flex-col">
                                        <div class="bg-purple-50 p-3 border-b border-gray-100 flex items-center gap-2">
                                            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                            <strong class="text-sm text-purple-900">Data Cluster</strong>
                                        </div>
                                        <div class="p-3 text-xs text-gray-600 flex-1 leading-relaxed">
                                            Instead of swapping data one card at a time, this renders the surrounding CSV records as a massive continuous background grid. <strong>Zoom out to preview your entire deck!</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr class="border-gray-100">

                            <!-- Secret Pro-Tips -->
                            <div>
                                <h4 class="text-lg font-bold text-gray-800 mb-2 border-b border-gray-100 pb-2">Hidden Tricks</h4>
                                <ul class="list-disc pl-5 text-sm text-gray-600 space-y-2">
                                    <li><strong>Math in Inputs:</strong> You can type math equations directly into any size/position input field (e.g., type <code class="bg-gray-100 px-1 rounded border border-gray-200 font-mono">2.5 * 3</code> and it will evaluate to <code class="bg-gray-100 px-1 rounded border border-gray-200 font-mono">7.5</code>).</li>
                                    <li><strong>Scroll Wheel Adjustments:</strong> Hover over any number input field and use your mouse scroll wheel to adjust the value up or down. Hold <kbd class="help-kbd">Shift</kbd> to jump by 10x!</li>
                                    <li><strong>Snap Toolbar:</strong> Press <kbd class="help-kbd">T</kbd> to instantly snap the floating toolbar directly to your cursor's current location.</li>
                                    <li><strong>Element Naming:</strong> Click the <code class="bg-gray-100 px-1 rounded font-bold border border-gray-200">ID</code> button on the floating toolbar to give an element a custom name. This is extremely useful for Plugins!</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- TAB 2: DOCUMENT SETUP -->
                    <div id="tab-doc" class="help-tab hidden help-animate-fade-in">
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Document Setup</h3>
                        <p class="text-gray-600 mb-6">Configure the physical dimensions and core properties of your card canvas.</p>

                        <div class="space-y-6">
                            <div>
                                <h4 class="text-lg font-bold text-gray-800 mb-2 border-b pb-2">1. Sizing & Resolution</h4>
                                <ul class="list-disc pl-5 text-sm text-gray-600 space-y-2">
                                    <li><strong>Presets vs Custom:</strong> Open the <strong>Document</strong> menu in the top toolbar to choose from industry-standard sizes (Poker, Tarot, Index) or define a custom Width and Height.</li>
                                    <li><strong>Global Units:</strong> Toggle the dropdown next to the Snapping menu to instantly convert the entire interface between <strong>Inches (in)</strong> and <strong>Millimeters (mm)</strong>.</li>
                                    <li><strong>Document DPI:</strong> DPI (Dots Per Inch) determines the physical pixel density. <strong>300 DPI</strong> is required for professional printing, while lower values are fine for digital prototyping.</li>
                                </ul>
                            </div>

                            <div>
                                <h4 class="text-lg font-bold text-gray-800 mb-2 border-b pb-2 mt-6">2. Front & Back Designs</h4>
                                <ul class="list-disc pl-5 text-sm text-gray-600 space-y-2">
                                    <li><strong>Enable Custom Back:</strong> Check the "Custom Back" box in the toolbar to unlock the reverse side of the card. A toggle button will appear, letting you flip between editing the Front and Back canvases.</li>
                                    <li><strong>Background Styles:</strong> Use the <strong>Style</strong> menu to set unique background colors, grids, or ruled lines independently for the front and back.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- TAB 3: TEMPLATES -->
                    <div id="tab-templates" class="help-tab hidden help-animate-fade-in">
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Using Templates</h3>
                        <p class="text-gray-600 mb-6">Templates allow you to dynamically inject data into your cards. Just type the syntax directly into any text or title box.</p>
                        
                        <div class="space-y-6">
                            <!-- Simple Variable -->
                            <div class="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                                <h4 class="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                    <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">Basic</span>
                                    Standard Variables
                                </h4>
                                <p class="text-sm text-gray-600 mb-3">If you only have one data source, simply wrap the column header in double curly braces.</p>
                                <div class="bg-gray-900 rounded-lg p-3 text-sm font-mono text-gray-300">
                                    Hello, <span class="text-green-400">{{Name}}</span>! You have <span class="text-green-400">{{HP}}</span> health.
                                </div>
                            </div>

                            <!-- Plugin/Multi Source -->
                            <div class="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                                <h4 class="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                    <span class="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs">Advanced</span>
                                    Specific Sources & Plugins
                                </h4>
                                <p class="text-sm text-gray-600 mb-3">If you have multiple CSVs or are using a Plugin, specify the source name first, followed by a comma.</p>
                                <div class="bg-gray-900 rounded-lg p-3 text-sm font-mono text-gray-300 space-y-2">
                                    <div><span class="text-gray-500">// Pulling from a specific CSV:</span></div>
                                    <div>Attack: <span class="text-purple-400">{{Weapons.csv, Damage}}</span></div>
                                    <div class="mt-2"><span class="text-gray-500">// Pulling from a Plugin script:</span></div>
                                    <div>Roll: <span class="text-purple-400">{{DiceRoller, d20}}</span></div>
                                </div>
                            </div>

                            <!-- Conditionals -->
                            <div class="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
                                <h4 class="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                    <span class="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-xs">Logic</span>
                                    Conditionals (If/Else)
                                </h4>
                                <p class="text-sm text-gray-600 mb-3">You can use a question mark <code class="bg-gray-100 px-1 rounded text-red-500 font-semibold">?</code> to render different text based on whether a variable exists or is true.</p>
                                <div class="bg-gray-900 rounded-lg p-3 text-sm font-mono text-gray-300">
                                    <span class="text-gray-500">// Syntax: {{Condition ? True Output, False Output}}</span><br>
                                    <span class="text-orange-300">{{IsBoss ? "Warning: Boss Level!", "Standard Enemy"}}</span>
                                </div>
                                <p class="text-xs text-gray-500 mt-3">Note: A condition is "false" if it's empty, 0, "false", "no", or missing.</p>
                            </div>
                        </div>
                    </div>

                    <!-- TAB 4: CSV & PLUGINS -->
                    <div id="tab-data" class="help-tab hidden help-animate-fade-in">
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">CSV Data & Plugins</h3>
                        <p class="text-gray-600 mb-6">Manage your data sources by clicking the <strong>Data Sources</strong> button (the table icon) in the left toolbar.</p>

                        <div class="space-y-6">
                            <!-- Importing CSV -->
                            <div>
                                <h4 class="text-lg font-bold text-gray-800 mb-2 border-b pb-2">1. Importing CSV Data</h4>
                                <ul class="list-disc pl-5 text-sm text-gray-600 space-y-2">
                                    <li>Open the <strong>Data Bank</strong> modal.</li>
                                    <li>Click <span class="bg-green-600 text-white text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm">+ Add Data</span> to upload a local <code>.csv</code> or <code>.json</code> file.</li>
                                    <li><strong>Cloud Sync:</strong> Click & Hold the Add Data button to import a live URL (e.g., a published Google Sheet). You can click the sync icon later to pull fresh data instantly.</li>
                                </ul>
                            </div>

                            <!-- Binding Data to Elements -->
                            <div>
                                <h4 class="text-lg font-bold text-gray-800 mb-2 border-b pb-2 mt-6">2. Binding Data to Elements</h4>
                                <p class="text-sm text-gray-600 mb-3">Instead of typing template syntax, you can bind data directly to elements via the top toolbar.</p>
                                <ul class="list-disc pl-5 text-sm text-gray-600 space-y-2">
                                    <li><strong>Select an Element:</strong> Click any text, title, or image box on the canvas.</li>
                                    <li><strong>Open Data Menu:</strong> Look for the <strong>Data Src</strong> and <strong>Var</strong> dropdowns in the top right formatting toolbar.</li>
                                    <li><strong>Bind:</strong> Select your CSV or Plugin from the Data Src list, then choose the specific column/variable from the Var list.</li>
                                    <li><strong>Preview:</strong> Once bound, a <code class="bg-gray-100 px-1 rounded font-mono border border-gray-200">&lt; &gt;</code> scrubber appears on the floating element toolbar. Click the arrows to instantly cycle through your records!</li>
                                </ul>
                            </div>

                            <!-- Using Images from CSV -->
                            <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
                                <h4 class="font-bold text-blue-800 mb-2 flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    Images via CSV
                                </h4>
                                <p class="text-sm text-blue-700 mb-2">If a CSV column header starts with <code>Images:</code> (e.g., <code>Images: Portrait</code>), the engine knows those text fields refer to filenames in your Image Bank.</p>
                                <p class="text-sm text-blue-700">You can bind an image box directly to that column using the <strong>Var</strong> dropdown in the toolbar!</p>
                            </div>

                            <!-- Installing Plugins -->
                            <div>
                                <h4 class="text-lg font-bold text-gray-800 mb-2 border-b pb-2 mt-6">3. Installing Plugins</h4>
                                <p class="text-sm text-gray-600 mb-3">Plugins are JavaScript snippets that can generate dynamic text, complex SVGs, or manipulate layout elements programmatically based on the current row.</p>
                                <ul class="list-disc pl-5 text-sm text-gray-600 space-y-2">
                                    <li>In the Data Bank, click <span class="bg-purple-600 text-white text-[10px] font-bold uppercase px-2 py-1 rounded shadow-sm">+ Add Plugin</span>.</li>
                                    <li>Upload a <code>.js</code> file, or click & hold to browse the <strong>Official Repository</strong> or create a new script from scratch.</li>
                                    <li>Once installed, plugins act exactly like CSV data—you can bind text or images to them from the toolbar, or use <code>{{PluginName, Variable}}</code> templates.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- TAB 5: EXPORT & PRINT -->
                    <div id="tab-print" class="help-tab hidden help-animate-fade-in">
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Exporting & Printing</h3>
                        <p class="text-gray-600 mb-6">Learn how to generate individual digital assets or format full sheets for physical printing.</p>

                        <div class="space-y-6">
                            <!-- Digital Export -->
                            <div>
                                <h4 class="text-lg font-bold text-gray-800 mb-2 border-b pb-2">1. Digital Asset Export</h4>
                                <ul class="list-disc pl-5 text-sm text-gray-600 space-y-2">
                                    <li>Open the <strong>Export</strong> dropdown in the top-right corner.</li>
                                    <li><strong>Single Card:</strong> Export the current visible face, or both faces, as high-quality PNGs.</li>
                                    <li><strong>Bulk Export (Data Merge):</strong> Click "Export All Faces" to iterate through your entire CSV dataset, generating a massive ZIP file containing every rendered card automatically!</li>
                                    <li><strong>Full Sheet PNGs:</strong> Export the calculated print layout grid directly as a flattened image, perfect for uploading to Tabletop Simulator or digital print shops.</li>
                                </ul>
                            </div>

                            <!-- Sheet Layout -->
                            <div>
                                <h4 class="text-lg font-bold text-gray-800 mb-2 border-b pb-2 mt-6">2. Print Layout & Bleed</h4>
                                <p class="text-sm text-gray-600 mb-3">Click the <strong>Layout & Print Options</strong> button (the printer icon) to configure how cards are arranged on physical paper.</p>
                                <ul class="list-disc pl-5 text-sm text-gray-600 space-y-2">
                                    <li><strong>Automatic Calculation:</strong> Select your paper size (e.g., US Letter, A4). The engine automatically calculates how many cards fit based on your document dimensions and gaps. Check the blue stat bar at the top of the menu!</li>
                                    <li><strong>Print Bleed:</strong> If your background color goes to the edge of the card, add a <strong>Bleed</strong> value (e.g., 0.125"). The engine will scale up the background layer beyond the cut line, preventing white slivers when you cut them out.</li>
                                    <li><strong>Guides & Marks:</strong> Toggle dashed cut-lines, or enable standard external corner crop marks for professional guillotine cutting.</li>
                                </ul>
                            </div>

                            <!-- Duplex Calibration -->
                            <div class="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-6">
                                <h4 class="font-bold text-orange-800 mb-2 flex items-center gap-2">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                                    Advanced: Duplex Hardware Drift
                                </h4>
                                <p class="text-sm text-orange-700 mb-2">No home printer feeds paper perfectly straight. When printing double-sided (Duplex), the back side is often shifted by a few millimeters.</p>
                                <ol class="list-decimal pl-5 text-sm text-orange-700 space-y-1">
                                    <li>Check <strong>Generate 2nd Page for Duplex</strong>. The engine will automatically reverse the grid columns so the backs line up with the fronts.</li>
                                    <li>Check <strong>Print Vernier Caliper Scale</strong> and do a test print.</li>
                                    <li>Hold the printed sheet up to the light. Look at the Vernier scale and find the number where the front and back lines perfectly overlap.</li>
                                    <li>Type that exact number into the <strong>X/Y Offset</strong> fields to electronically shift the grid and permanently correct your printer's hardware drift!</li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    <!-- TAB 6: KEYBOARD SHORTCUTS -->
                    <div id="tab-shortcuts" class="help-tab hidden help-animate-fade-in">
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">Keyboard Shortcuts</h3>
                        <p class="text-gray-600 mb-6">Speed up your workflow using these hotkeys.</p>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            
                            <!-- General / File -->
                            <div class="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                                <div class="bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">General</div>
                                <div class="p-4 space-y-3">
                                    <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                                        <span class="text-sm text-gray-700">Quick Help</span>
                                        <kbd class="help-kbd">?</kbd>
                                    </div>
                                    <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                                        <span class="text-sm text-gray-700">Print / Export Menu</span>
                                        <div class="flex gap-1"><kbd class="help-kbd">Ctrl</kbd><span class="text-gray-400">+</span><kbd class="help-kbd">P</kbd></div>
                                    </div>
                                    <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                                        <span class="text-sm text-gray-700">Undo</span>
                                        <div class="flex gap-1"><kbd class="help-kbd">Ctrl</kbd><span class="text-gray-400">+</span><kbd class="help-kbd">Z</kbd></div>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="text-sm text-gray-700">Redo</span>
                                        <div class="flex gap-1"><kbd class="help-kbd">Ctrl</kbd><span class="text-gray-400">+</span><kbd class="help-kbd">Y</kbd></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Editing -->
                            <div class="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                                <div class="bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">Editing</div>
                                <div class="p-4 space-y-3">
                                    <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                                        <span class="text-sm text-gray-700">Copy</span>
                                        <div class="flex gap-1"><kbd class="help-kbd">Ctrl</kbd><span class="text-gray-400">+</span><kbd class="help-kbd">C</kbd></div>
                                    </div>
                                    <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                                        <span class="text-sm text-gray-700">Paste</span>
                                        <div class="flex gap-1"><kbd class="help-kbd">Ctrl</kbd><span class="text-gray-400">+</span><kbd class="help-kbd">V</kbd></div>
                                    </div>
                                    <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                                        <span class="text-sm text-gray-700">Cut</span>
                                        <div class="flex gap-1"><kbd class="help-kbd">Ctrl</kbd><span class="text-gray-400">+</span><kbd class="help-kbd">X</kbd></div>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="text-sm text-gray-700">Delete Element</span>
                                        <div class="flex gap-1"><kbd class="help-kbd">Del</kbd> <span class="text-xs text-gray-400">or</span> <kbd class="help-kbd">Bksp</kbd></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Canvas & Selection -->
                            <div class="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm md:col-span-2">
                                <div class="bg-gray-50 px-4 py-2 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">Canvas & Selection</div>
                                <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                    <div class="flex justify-between items-center border-b border-gray-100 pb-2 md:border-none md:pb-0">
                                        <span class="text-sm text-gray-700">Multi-Select</span>
                                        <div class="flex gap-1"><kbd class="help-kbd">Shift</kbd><span class="text-gray-400">+</span><span class="text-sm text-gray-600">Click</span></div>
                                    </div>
                                    <div class="flex justify-between items-center border-b border-gray-100 pb-2 md:border-none md:pb-0">
                                        <span class="text-sm text-gray-700">Pan Canvas</span>
                                        <div class="flex gap-1"><kbd class="help-kbd">Shift</kbd><span class="text-gray-400">+</span><span class="text-sm text-gray-600">Drag</span></div>
                                    </div>
                                    <div class="flex justify-between items-center border-b border-gray-100 pb-2 md:border-none md:pb-0">
                                        <span class="text-sm text-gray-700">Group Elements</span>
                                        <div class="flex gap-1"><kbd class="help-kbd">Ctrl</kbd><span class="text-gray-400">+</span><kbd class="help-kbd">G</kbd></div>
                                    </div>
                                    <div class="flex justify-between items-center border-b border-gray-100 pb-2 md:border-none md:pb-0">
                                        <span class="text-sm text-gray-700">Ungroup</span>
                                        <div class="flex gap-1"><kbd class="help-kbd">Ctrl</kbd><span class="text-gray-400">+</span><kbd class="help-kbd">Shift</kbd><span class="text-gray-400">+</span><kbd class="help-kbd">G</kbd></div>
                                    </div>
                                    <div class="flex justify-between items-center border-b border-gray-100 pb-2 md:border-none md:pb-0">
                                        <span class="text-sm text-gray-700">Reset View (Auto-Center)</span>
                                        <div class="flex gap-1"><kbd class="help-kbd">Ctrl</kbd><span class="text-gray-400">+</span><kbd class="help-kbd">0</kbd></div>
                                    </div>
                                    <div class="flex justify-between items-center">
                                        <span class="text-sm text-gray-700">Snap Toolbar to Cursor</span>
                                        <kbd class="help-kbd">T</kbd>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- TAB 7: ABOUT -->
                    <div id="tab-about" class="help-tab hidden help-animate-fade-in">
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">About & Support</h3>
                        <p class="text-gray-600 mb-8">Quick Card Designer</p>

                        <div class="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center max-w-2xl mx-auto shadow-sm">
                            <div class="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4">
                                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                            </div>
                            <p class="text-gray-700 text-base mb-4 leading-relaxed">
                                This is a completely free, browser-based layout engine tailored for flash cards, recipe cards, and other small print formats. Quick Card Designer generates complete ready-to-print files, with support for data fields, printer hardware calibration and more.
                            </p>
                            <p class="text-gray-500 text-sm mb-6">
                                Created by <strong class="text-gray-800">Adam Risi</strong>
                            </p>
                            <div class="border-t border-gray-200 pt-6">
                                <p class="text-gray-600 text-sm mb-4">
                                    If you find this tool helpful for your projects, consider leaving a tip to support its continued development!
                                </p>
                                <a href="https://paypal.me/serenitynowbrc" target="_blank" class="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm gap-2">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.82 1.012 4.568-.328 1.96-1.503 3.633-3.21 4.564-1.37.752-3.132 1.096-5.068 1.096h-1.55c-.41 0-.763.298-.838.702l-1.077 5.856c-.033.18-.184.316-.368.316h-1.74l-.626 3.426c-.046.253-.264.434-.52.434h-.942z"/></svg>
                                    Donate via PayPal
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    `;

    const wrapperElement = document.createElement('div');
    wrapperElement.innerHTML = modalHtml;
    document.body.appendChild(wrapperElement.firstElementChild);

    window.openHelpModal = function() {
        const wrapper = document.getElementById('help-wrapper');
        const backdrop = document.getElementById('help-backdrop');
        const modal = document.getElementById('help-modal');
        
        // Ensure the old info modal isn't popping up if it exists
        const oldInfo = document.getElementById('info-modal');
        if (oldInfo && !oldInfo.classList.contains('hidden')) {
            if (typeof closeInfoModal === 'function') closeInfoModal();
        }
        
        wrapper.classList.remove('hidden');
        wrapper.classList.add('flex');
        
        // Force reflow
        void wrapper.offsetWidth;
        
        backdrop.classList.remove('opacity-0');
        backdrop.classList.add('opacity-100');
        
        modal.classList.remove('opacity-0', 'scale-95', 'translate-y-4');
        modal.classList.add('opacity-100', 'scale-100', 'translate-y-0');
        
        const btn = document.getElementById('info-btn');
        if (btn) btn.classList.add('opacity-0', 'pointer-events-none', 'scale-75');
    };

    window.closeHelpModal = function() {
        const wrapper = document.getElementById('help-wrapper');
        const backdrop = document.getElementById('help-backdrop');
        const modal = document.getElementById('help-modal');
        
        backdrop.classList.remove('opacity-100');
        backdrop.classList.add('opacity-0');
        
        modal.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
        modal.classList.add('opacity-0', 'scale-95', 'translate-y-4');
        
        const btn = document.getElementById('info-btn');
        if (btn) btn.classList.remove('opacity-0', 'pointer-events-none', 'scale-75');
        
        setTimeout(() => {
            wrapper.classList.add('hidden');
            wrapper.classList.remove('flex');
        }, 300);
    };

    window.switchHelpTab = function(tabId) {
        document.querySelectorAll('.help-tab').forEach(tab => {
            tab.classList.add('hidden');
            tab.classList.remove('block');
        });
        
        document.querySelectorAll('.help-nav-btn').forEach(btn => {
            btn.classList.remove('text-blue-700', 'bg-blue-50');
            btn.classList.add('text-gray-600', 'hover:bg-gray-100', 'hover:text-gray-900');
        });
        
        const target = document.getElementById(tabId);
        if(target) {
            target.classList.remove('hidden');
            target.classList.add('block');
        }
        
        const activeBtnId = tabId.replace('tab-', 'nav-');
        const activeBtn = document.getElementById(activeBtnId);
        if(activeBtn) {
            activeBtn.classList.remove('text-gray-600', 'hover:bg-gray-100', 'hover:text-gray-900');
            activeBtn.classList.add('text-blue-700', 'bg-blue-50');
        }
    };

    const bindHelpMenu = () => {
        // Hijack the existing info button securely without deleting it
        const infoBtn = document.getElementById('info-btn');
        if (infoBtn) {
            // Strip out any inline onclick handlers that might exist
            infoBtn.removeAttribute('onclick');
            
            // Apply our new modal trigger securely
            infoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                window.openHelpModal();
            });
        }
        
        // Listen for standard global Hotkeys
        document.addEventListener('keydown', (e) => {
            const isInput = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable;
            const wrapper = document.getElementById('help-wrapper');
            
            if (e.key === 'Escape') {
                if (wrapper && !wrapper.classList.contains('hidden')) {
                    window.closeHelpModal();
                    e.stopPropagation();
                }
            } else if (e.key === '?' && !isInput) {
                if (wrapper && wrapper.classList.contains('hidden')) {
                    window.openHelpModal();
                    e.preventDefault();
                }
            }
        });
    };

    // Ensure the DOM is fully parsed before binding to #info-btn
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindHelpMenu);
    } else {
        bindHelpMenu();
    }
})();