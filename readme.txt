=== Plugin Name ===
Contributors: eskapism
Donate link: http://eskapism.se/sida/donate/
Tags: page, pages, tree, cms, dashboard, overview, drag-and-drop, rearrange, management, manage, admin
Requires at least: 3.0
Tested up to: 3.0
Stable tag: trunk

Adds a CMS-like tree overview of all your pages. Edit, view, add pages, search pages, and drag and drop to rearrange the order of your pages.

== Description ==

This plugin adds a CMS-like tree overview of all your pages to WordPress - like the view often found in a page-focused CMS. 
Within this page tree you can edit pages, view pages, add pages, search pages, and drag and drop pages to rearrange the order.

Page management won't get any easier than this!

Please note that this plugin now requires WordPress 3. If you are using WordPress 2.x you can try this old version instead: http://downloads.wordpress.org/plugin/cms-tree-page-view.0.4.9.zip

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

= 0.5.6 =
- password protected posts now show a lock icon (thanks to [Seebz](seebz.net) for contributing)

= 0.5.5 =
- ok, now the texts should be translated. for real! thanks for the bug report!

= 0.5.4 =
- when mouse over the litte arrow the cursor is now a hand again. it just feels a little bit better that way.
- some texts where not translated due to wp_localize_script being called before load_plugin_textdomain. thanks for reporting this.

= 0.5.3 =
- link to "add new page" when there were no pages now work
- changed native js prompt to http://abeautifulsite.net/2008/12/jquery-alert-dialogs/ (mostly because you can use your other browser tabs while the dialog/prompt is open)
- added a thank-you-please-donate-box. please do what it says! :)
- started using menu_page_url instead of hard-coding path to plugin
- now requires WordPress 3

= 0.5.2 =
- you could get an error if used together with the "Simple Fields" WordPress plugin (yes, I used the same function name in both plugin! Fool me twice, shame on me.)

= 0.5.1 =
- forgot to add styles to svn

= 0.5 =
- Uses wp_localize_script to translate script. Previous method could lead to 404-error, although the file did exist.
- More valid output
- jsTree upgraded to 1.0rc
- Code rewritten for upgraded jsTree
- Added a "clear search"-button to the search box
- Dashboard widget added again! Hooray!
- Requires WordPress 3 because of jquery 1.4.2. If you are using WP 2.x you can try version 0.4.9 instead: http://downloads.wordpress.org/plugin/cms-tree-page-view.0.4.9.zip

= 0.4.9 =
- added French translation by Bertrand Andres

= 0.4.8 =
- added russian translation by Alexufo (www.serebniti.ru)
- fixed a link that didn't change color on mouse over

= 0.4.7 =
- remove some code that did not belong...
- does not show auto-draft-posts in wp3

= 0.4.6 =
- could get database error because post_content had no default value
- removed usage of console.log and one alert. ouch!
- when adding page inside, several posts could get menu_order = 0, which led to sorting problems

= 0.4.5 =
- added Belorussian translation by [Marcis G.](http://pc.de/)
- settings page did not check checkboxes by default
- tree removed from dashboard due some problems with event bubbling (will be re-added later when problem is fixed)

= 0.4.4 =
- translation now works in javascript (forgot to use load_plugin_textdomain)
- added swedish translation by Måns Jonasson

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
