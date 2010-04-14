=== Plugin Name ===
Contributors: eskapism
Tags: page, pages, tree, cms, dashboard, overview, drag-and-drop, rearrange, management, manage
Requires at least: 2.9.2
Tested up to: 2.9.2
Stable tag: trunk

Adds a CMS-like tree overview of all your pages. Edit, view, add pages, search pages, and drag and drop to rearrange the order of your pages.

== Description ==

This plugin adds a CMS-like tree overview of all your pages to WordPress - like the view often found in a page-focused CMS. 
Within this page tree you can edit pages, view pages, add pages, search pages, and drag and drop pages to rearrange the order.

Page management won't get any easier than this!

#### Features and highlights:

* drag and drop to rearrange your pages
* add pages after or inside a page
* edit pages
* view pages
* search pages

#### Screencast
See the plugin in action with this short screencast:
[youtube http://www.youtube.com/watch?v=H4BGomLi_FU]

== Installation ==

1. Upload the folder "cms-tree-page-view" to "/wp-content/plugins/"
1. Activate the plugin through the "Plugins" menu in WordPress
1. Done!

Now the tree with the pages will be visible both on the dashboard and in the menu under pages.

== Screenshots ==

1. The page tree in action
2. Edit, view and add pages (choices visible upon mouse over).
3. Search pages.
4. Drag-and-drop to rearrange/change the order of the pages.
5. The tree is also available on the dashboard and therefore available immediately after you login.

== Changelog ==

= 0.4.3 =
- forgot the domain for _e at some places

= 0.4.2 =
- added .pot-file

= 0.4.1 =
- more prepare for translation
- fixed some <? into <?php

= 0.4 =
- uses strict json (fix for jquery 1.4)
- pages with no title now show "untitled" instead of just disappearing
- uses get_the_title instead of getting the title direct from the db, making plugins such as qtranslate work
- preparing for translation, using __ and _e

= 0.3 =
* all | public: works on the dasboard
* all | public: are now loaded using ajax. no more reloads!
* added options page so you can choose where to show the tree (i.e. the dasboard or under "pages"...or both, of course!). only available for admins.
* capability "edit_pages" required to view the tree

= 0.2 =
* Possible fix for Fluency Admin

= 0.1a =
* First public version.
