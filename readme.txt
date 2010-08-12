=== Plugin Name ===
Contributors: eskapism
Donate link: http://eskapism.se/sida/donate/
Tags: page, pages, posts, custom posts, tree, cms, dashboard, overview, drag-and-drop, rearrange, management, manage, admin
Requires at least: 3.0
Tested up to: 3.0
Stable tag: trunk

Adds a CMS-like tree overview of your pages or custom posts. Rearrange the order of your pages (with drag and drop). Also edit, view, add, and search your pages.

== Description ==

This plugin adds a CMS-like tree overview of all your pages and custom posts to WordPress - much like the view often found in a page-focused CMS, or like Windows Explorer or OS X Finder.
Within this tree you can edit pages, view pages, add pages, search pages, and drag and drop pages to rearrange the order.

CMS Tree Page View is a good alternative to plugins such as [pageMash](http://wordpress.org/extend/plugins/pagemash/), [WordPress Page Tree](http://wordpress.org/extend/plugins/page-tree/)
and [My Page Order](http://wordpress.org/extend/plugins/my-page-order/) .

Page management won't get any easier than this!

#### Features and highlights:

* drag and drop to rearrange your pages
* add pages after or inside a page
* edit pages
* view pages
* search pages
* available for both regular pages and custom posts
* easy view your site hierarchy directly from the WordPress dashboard
* supports WPML, so you can manage all the languages of your site

#### Screencast

Watch this screencast to see how easy you could be managing your pages:
[youtube http://www.youtube.com/watch?v=H4BGomLi_FU]

#### Translations/Languages
This plugin is available in the following languages:

* English
* German
* French
* Russian
* Belorussian
* Swedish

#### Making the tree available for your vistors
If you're looking for a version of this page tree that the vistors of your site can use, then check out
this navigation widget called [Nice Navigation](http://wordpress.org/extend/plugins/nice-navigation/).

#### Donation and more plugins
* If you like this plugin don't forget to [donate to support further development](http://eskapism.se/sida/donate/).
* Check out some [more plugins](http://wordpress.org/extend/plugins/profile/eskapism) by the same author.

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
6. The settings page - choose where you want the tree to show up
7. Users of WPML can find all their languages in the tree

== Changelog ==

= 0.7.1 =
- quick fix: capability edit_pages required to view the tree menu, instead of editor (which led to administrators not being able to view the tree...)

= 0.7 =
- added comment count to pop up
- added support for custom columns in pop up = now you have the same information available in CMS Tree Vage View as in the normal page/post edit screen
- fixed some colors to better match wordpress own style
- editor capability required to view tree. previosly only administators chould see the tree  in the menu, while everyone could view the tree on the dashboard.
- no more infinite loops with role scoper installed
- tested on WordPress Multisite


= 0.6.3 =
- tree is activated for pages during install, so the user does not need to set up anything during first run

= 0.6.2 =
- Was released only as a public beta together with wpml.org, to test the wpml-integration
- Now supports custom post types.
- Now compatible with WPML Multilangual CMS (wpml.org). 
- Uses WordPress own functions at some more places.
- When searching and no posts found you now get a message so you know that there were no matches.
- German translation added, by Thomas Dullnig (www.sevenspire.com). Thank you!
- Lots of code rewritten for this update of CMS Tree Page View, so please let me know if it works or if I broke something!

= 0.6.1 =
- Forgot to close a p-tag correctly. Now it should validate again!
- Fixed a problem where move could seem to not work when trying to move pages when several pages had the same menu_order, so they where sorted by alpha instead.
- fixed a problem with qtranslate that resulted in endless "loading tree..."
- the thank you/need help/please donate-box is re-enabled upon upgrade/re-activation of the plugin. Just so you won't forget that you can donate! :)

= 0.6 =
- updated french translation
- new box for mouse-over/pop-up - please let me know what you think about it
- new box: it's bigger so it's less likely that you slide out of it with your mouse (happend to me all the time! very annoying...) . 
- new box: more information can be fitted there. let me know if there is any information you would like to see in the popup (right now it will show you the last modified date + the id of the page)
- new box: edit and view links are real links now, so you can edit or view pages in for example a new tab
- new box: oh.. and it's much better looking! :)

= 0.5.7 =
- jquery.cookie.js renamed to jquery.biscuit.js to fix problems with apache module mod_security. let me know if it actually works! :)
- updated .pot-file, so translators out there may want to check if everything is up to date

= 0.5.6 =
- password protected posts now show a lock icon (thanks to [Seebz](http://seebz.net) for contributing)

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


== Still on WordPress 2? ==
If you are using WordPress 2.x you can try this old version instead:
http://downloads.wordpress.org/plugin/cms-tree-page-view.0.4.9.zip

