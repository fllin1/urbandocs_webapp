Subject: New Feature Request: HTML Template Page for Displaying PLU Summaries with Pre-generated PDF Download

I need your help to build a new feature for my website: a dynamic HTML template page designed to display PLU (Plan Local d'Urbanisme - Local Urban Planning Plan) summaries. This page will serve as a template, meaning the core structure and interactive elements will remain consistent, while the PLU summary content itself (including specific items like "Specific prohibitions within catchment perimeters and on/in protected elements (pylons, antennas...) in addition. (Source: Common rules, 9)") will change for each document.

The website is built using HTML, CSS, and vanilla JavaScript (no frameworks). Supabase is used as the database, and PDF documents will be pre-generated and stored in Supabase Storage.

**I. Core Objective:**

Create a reusable HTML template page (`plu_summary_template.html`) for displaying individual PLU summaries. This page must be accessible only to authenticated users.

**II. Development Steps & Key Features:**

1.  **HTML Page Structure Design:**
    * Create an HTML template for the document display page.
    * **Layout:**
        * **Desktop View:**
            1.  **Top Section:** Document Title (e.g., "Synthèse du PLU de [Nom de la Ville]").
            2.  **Main Content Section (Two Columns):**
                * **Left Column:** The PLU summary content itself, rendered from Markdown (fetched from the `documents` table). This area should be scrollable if the content is long.
                * **Right Column:** A fixed/sticky Table of Contents (ToC) automatically generated from the headings (H1-H4) of the PLU summary. Each ToC item should be a link to an anchor within the PLU summary content.
            3.  **Bottom Section:** Comments section, Star rating system, Download button.
        * **Responsive Behavior (Narrow Screens / Mobile):**
            * The Table of Contents (ToC) should move from the right column to display *above* the PLU summary content. The PLU summary content would then take the full width below the ToC.

2.  **PLU Summary Content & Table of Contents (ToC):**
    * The PLU summary will be fetched as Markdown from the `plu_summary_markdown_content` field in the `documents` Supabase table. The template needs to render this Markdown into HTML.
    * The structure of the PLU summary (and thus the ToC) will always follow this general outline (headings H1-H4 indicate nesting):
        ```markdown
        # DISPOSITION GENERALES
        ## CHAPITRE 1 - DESTINATION DES CONSTRUCTIONS, USAGE DES SOLS, ACTIVITÉS ET INSTALLATIONS, MIXITÉ FONCTIONNELLE ET SOCIALE
        ### 1 - CONSTRUCTIONS, USAGES ET AFFECTATIONS DES SOLS, ACTIVITÉS ET INSTALLATIONS INTERDITS
        #### 1.1. CONSTRUCTIONS INTERDITES
        - ...
        - ...
        #### 1.2. USAGES ET AFFECTATIONS DES SOLS INTERDITS
        - ...
        - ...
        #### 1.3. ACTIVITÉS ET INSTALLATIONS INTERDITES
        - ...
        - ...
        ### 2 - CONSTRUCTIONS, USAGES ET AFFECTATIONS DES SOLS, ACTIVITÉS ET INSTALLATIONS SOUMISES À CONDITIONS PARTICULIÈRES
        #### 2.1. CONSTRUCTIONS SOUMISES À DES CONDITIONS PARTICULIÈRES
        - ...
        - ...
        #### 2.2. USAGES ET AFFECTATIONS DES SOLS SOUMIS À DES CONDITIONS PARTICULIÈRES
        - ...
        - ...
        #### 2.3. ACTIVITÉS ET INSTALLATIONS SOUMISES À DES CONDITIONS PARTICULIÈRES
        - ...
        - ...
        ### 3 - MIXITÉ FONCTIONNELLE ET SOCIALE
        #### 3.1. DISPOSITIONS EN FAVEUR DE LA MIXITÉ COMMERCIALE ET FONCTIONNELLE
        - ...
        - ...
        #### 3.2. RÈGLES DIFFÉRENCIÉES ENTRE REZ-DE-CHAUSSÉE ET ÉTAGES SUPÉRIEURS
        - ...
        - ...
        #### 3.3. DISPOSITIONS EN FAVEUR DE LA MIXITÉ SOCIALE
        - ...
        - ...
        ## CHAPITRE 2 - CARACTÉRISTIQUES URBAINES, ARCHITECTURALES, ENVIRONNEMENTALES ET PAYSAGÈRES
        ### 4 - IMPLANTATION ET VOLUMÉTRIE DES CONSTRUCTIONS ET DES INSTALLATIONS
        #### 4.1. IMPLANTATION PAR RAPPORT AUX VOIES ET EMPRISES PUBLIQUES
        - ...
        - ...
        #### 4.2. IMPLANTATION DES CONSTRUCTIONS PAR RAPPORT AUX LIMITES SÉPARATIVES
        - ...
        - ...
        #### 4.3. IMPLANTATION DES CONSTRUCTIONS LES UNES PAR RAPPORT AUX AUTRES SUR UNE MÊME PROPRIÉTÉ
        - ...
        - ...
        #### 4.4. EMPRISE AU SOL DES CONSTRUCTIONS
        - ...
        - ...
        #### 4.5. COEFFICIENT D'EMPRISE AU SOL MINIMUM ET HAUTEUR MINIMUM AU SEIN DES PÉRIMÈTRES D'INTENSIFICATION URBAINE
        - ...
        - ...
        #### 4.6. HAUTEUR DES CONSTRUCTIONS ET DES INSTALLATIONS
        - ...
        - ...
        ### 5 - QUALITÉ URBAINE, ARCHITECTURALE, ENVIRONNEMENTALE ET PAYSAGÈRE
        #### 5.1. INSERTION DES CONSTRUCTIONS ET DES INSTALLATIONS DANS LEUR ENVIRONNEMENT
        - ...
        - ...
        #### 5.2. CARACTÉRISTIQUES ARCHITECTURALES DES FAÇADES ET TOITURES
        - ...
        - ...
        #### 5.3. CARACTÉRISTIQUES DES CLÔTURES
        - ...
        - ...
        #### 5.4. PRESCRIPTIONS RELATIVES AU PATRIMOINE BÂTI ET PAYSAGER À PROTÉGER, À CONSERVER, À RESTAURER, À METTRE EN VALEUR OU À REQUALIFIER
        - ...
        - ...
        ### 6 - TRAITEMENT ENVIRONNEMENTAL ET PAYSAGER DES ESPACES NON BÂTIS, DES CONSTRUCTIONS ET DE LEURS ABORDS
        #### 6.1. OBLIGATIONS EN MATIÈRE DE RÉALISATION D'ESPACES LIBRES ET DE PLANTATIONS, D'AIRES DE JEUX ET DE LOISIRS
        - ...
        - ...
        #### 6.2. SURFACES VÉGÉTALISÉES OU PERMÉABLES
        - ...
        - ...
        #### 6.3. MAINTIEN OU REMISE EN ÉTAT DES CONTINUITÉS ÉCOLOGIQUES
        - ...
        - ...
        #### 6.4. GESTION DES EAUX PLUVIALES ET DU RUISSELLEMENT
        - ...
        - ...
        #### 6.5. AMÉNAGEMENT D'EMPLACEMENTS SPÉCIFIQUES DÉDIÉS À LA COLLECTE DES DÉCHETS MÉNAGERS ET ASSIMILÉS
        - ...
        - ...
        ## CHAPITRE 3 - EQUIPEMENTS ET RÉSEAUX
        ### 7 - STATIONNEMENT
        #### 7.1. STATIONNEMENT DES VÉHICULES MOTORISÉS
        - ...
        - ...
        #### 7.2. STATIONNEMENT DES CYCLES
        - ...
        - ...
        ### 8 - DESSERTE PAR LES VOIES PUBLIQUES ET PRIVÉES
        #### 8.1. ACCÈS
        - ...
        - ...
        #### 8.2. VOIRIES
        - ...
        - ...
        ### 9 - DESSERTE PAR LES RÉSEAUX
        #### 9.1. ALIMENTATION EN EAU POTABLE
        - ...
        - ...
        #### 9.2. GESTION DES EAUX USÉES DOMESTIQUES
        - ...
        - ...
        #### 9.3. GESTION DES EAUX USÉES NON DOMESTIQUE
        - ...
        - ...
        #### 9.4. UTILISATION DU RÉSEAU D'EAUX PLUVIALES
        - ...
        - ...
        #### 9.5. RÉSEAUX ÉLECTRIQUES ET TÉLÉPHONIQUES
        - ...
        - ...
        #### 9.6. DÉPLOIEMENT DE LA FIBRE OPTIQUE
        - ...
        - ...
        ### 10 - ENERGIE ET PERFORMANCES ÉNERGÉTIQUES
        - ...
        - ...
        ```
    * The ToC must be dynamically generated based on these H1-H4 headings.

3.  **Implementation of Interactions (using Supabase where applicable):**
    * **Comment System:** (Authenticated users post/view comments, stored in `comments` table).
    * **Rating System:** (Authenticated users give/view star ratings, stored in `ratings` table).
    * **Download Button:**
        * The button should allow users to download a **pre-generated PDF version** of the PLU summary.
        * This PDF will be stored in Supabase Storage. The `documents` table will contain a field (e.g., `pdf_storage_path`) storing the path to this PDF.
        * The button's action will be to trigger a download of the file at this path/URL. Logic will be needed to construct the public URL from the stored path if necessary.

4.  **Data Model (Supabase Tables - see details below prompt):**
    * `documents` (for PLU summary metadata, Markdown content, and PDF path)
    * `comments`
    * `ratings`

5.  **Authentication:** The entire page should only be accessible to users who are logged in (authenticated via Supabase Auth).

**III. Styling Guidelines (Maintain existing site aesthetic):**
    (As previously described: minimalist, rectangular, black/white/gray, Helvetica Neue, subtle hover shadows, bottom-border forms).

**IV. Additional Feature (Optional - if feasible within scope):**
    * **View History:** (Implement `view_history` table and logic to track views for authenticated users).

**V. Key Deliverables:**
1.  HTML, CSS, and JavaScript code for the template page.
2.  JavaScript snippets for Supabase interactions (fetching document data including PDF path, submitting comments/ratings, authentication checks, logging views).
3.  Clear indication of how the `pdf_storage_path` from the `documents` table should be used to construct the downloadable link for the PDF in Supabase Storage.

Please let me know if you have any questions. The key for the download button is that it will link to an already existing PDF in Supabase Storage.