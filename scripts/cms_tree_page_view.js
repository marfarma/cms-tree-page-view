// Case Insensitive :contains()
// Source: http://ericphan.info/blog/2009/3/4/jquery-13-case-insensitive-contains.html
jQuery.extend(jQuery.expr[":"], {
    "containsNC": function(elem, i, match, array) {
        return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});

// check if tree is beging dragged
function cms_tpv_is_dragging() {
	return (jQuery("#jstree-dragged").length == 1) ? true : false;
}

// mouse over, show actions
jQuery(".tree li a").live("mouseover", function() {
	$t = jQuery(this);
	$actions = $t.find(".cms_tpv_action_view, .cms_tpv_action_edit, .cms_tpv_action_add_page, .cms_tpv_action_add_page_after, .cms_tpv_action_add_page_inside");
	if (cms_tpv_is_dragging() == false) {
		$actions.show();
		// remove possible timeoutID
		/*
		var timeoutID = $t.data("timeoutID");
		if (timeoutID) {
			clearTimeout(timeoutID);
			$t.data("timeoutID", null);
		}
		*/
	}
});
// ..and hide them again
// @todo: hide after a short delay. fitts law stuff
jQuery(".tree li a").live("mouseout", function() {
	$t = jQuery(this);
	$actions = $t.find(".cms_tpv_action_view, .cms_tpv_action_edit, .cms_tpv_action_add_page, .cms_tpv_action_add_page_after, .cms_tpv_action_add_page_inside");
	$actions.hide();
	/*
	var func = test($actions);
	var timeoutID = setTimeout(func, 500);
	$t.data("timeoutID", timeoutID);
	*/
});

// go to page on click
jQuery(".tree li a .cms_tpv_action_view").live("click", function() {
	var $li = jQuery(this).closest("li");
	var permalink = $li.attr("permalink");
	if (permalink) {
		document.location = permalink;
	}
	return false;
});
// edit page on click
jQuery(".tree li a .cms_tpv_action_edit").live("click", function() {
	var $a = jQuery(this).closest("a");
	var editlink = $a.attr("href");
	if (editlink) {
		document.location = editlink;
	}
	return false;
});

// add page after
jQuery(".tree li a .cms_tpv_action_add_page_after").live("click", function() {
	var new_page_title = prompt("Enter title of new page", "");
	if (new_page_title) {
		var pageID = jQuery(this).closest("li").attr("id");
		jQuery.post(ajaxurl, {
			action: "cms_tpv_add_page",
			pageID: pageID,
			type: "after",
			page_title: new_page_title
		}, function(data, textStatus) {
			document.location = data;
		});
	}
	return false;
});

// add page inside
jQuery(".tree li a .cms_tpv_action_add_page_inside").live("click", function() {
	var new_page_title = prompt("Enter title of new page", "");
	if (new_page_title) {
		var pageID = jQuery(this).closest("li").attr("id");
		jQuery.post(ajaxurl, {
			action: "cms_tpv_add_page",
			pageID: pageID,
			type: "inside",
			page_title: new_page_title
		}, function(data, textStatus) {
			document.location = data;
		});
	}
	return false;
});


// hide action links on drag
jQuery.tree.drag_start = function() {
	jQuery(".cms_tpv_action_view, .cms_tpv_action_edit, .cms_tpv_action_add_page, .cms_tpv_action_add_page_after, .cms_tpv_action_add_page_inside").hide();
}


var bonnyTree;
jQuery(function($) {

	var treeOptions = {
		data: {
			async: true,
			type: "json",
			opts: {
				url: ajaxurl + CMS_TPV_AJAXURL
			}
		},
		ui: {
			theme_path: CMS_TPV_URL + "scripts/themes/default/style.css", // this setting seems a bit bananas. be sure to check that it works when jstree 1.0 is released
			theme_name: "default",
			animation: 200
		},
		plugins: { 
			cookie: {
				prefix: "jstree_",
				types : {
					selected: false
				}
			}
		},
		types: {
			"default": {
				icon: {
					image: CMS_TPV_URL + "images/page_white_text.png"
				}
			},
			"draft": {
			},
			"pending": {
			},
			"password": {
			},
			"future": {
			}
		},
		callback: {
			// data = array of objects
			ondata: function(DATA, TREE_OBJ) {
			
				jQuery.each(DATA, function(index, value) {
					
					// add number of children and page type and span-actions
					cms_tree_page_view_add_spans_to_tree_ondata(DATA[index]);

				});
				return DATA;
			},

			// select = go and edit
			// hm..or not...let me think about this... use actions-popup for now
			// @todo: check if jquery live's click and dblclick can make 1 click = edit, 2 clicks = open
			// @todo: currently this swallows to many clicks (on links outside the tree for example). 
			// newer version of jquery is supposed to fix this
				onselect: function(NODE, TREE_OBJ) {
				$selected = $(bonnyTree.selected);
				var editLink = $selected.find("a").attr("href");
				document.location = editLink;
			},
			
			onmove: function(NODE, REF_NODE, TYPE, TREE_OBJ, RB) {
				// get ids of our friends
				var node_id = $( NODE ).attr( "id" );
				ref_node_id = $( REF_NODE ).attr( "id" );
				
				// Update parent or menu order
				$.post(ajaxurl, {
					action: "cms_tpv_move_page", 
					"node_id": node_id, 
					"ref_node_id": ref_node_id, 
					type: TYPE 
				}, function(data, textStatus) {
				});
				
			},
			
			onsearch: function(NODES, TREE_OBJ) {
				// if empy nodes = no hits
				if (NODES.length == 0) {
					$("#cms_tpv_search_no_hits").show();
				}
				NODES.addClass("search");
				$("#cms_tree_view_search_form_working").fadeOut("fast");
			}

		}
	}

	if ($("#bonnyTreeContainer").length == 1) {
		$("#bonnyTreeContainer").tree(treeOptions);
		bonnyTree = jQuery.tree.reference("#bonnyTreeContainer");
	}

	jQuery("#cms_tree_view_search_form").submit(function() {
		$("#cms_tpv_search_no_hits").hide();
		var s = jQuery("#cms_tree_view_search").attr("value");
		s = jQuery.trim( s );
		// search, oh the mighty search!
		if (s) {
			$("#cms_tree_view_search_form_working").fadeIn("fast");
		}
		bonnyTree.search(s, "containsNC");
		return false;
	});


	// open/close links
	jQuery("#cms_tpv_open_all").click(function() {
		bonnyTree.open_all();
		return false;
	});
	jQuery("#cms_tpv_close_all").click(function() {
		bonnyTree.close_all();
		return false;
	});


}); // end ondomready


/**
 * Add type, children count and span-actions
 * data is one DATA[index]
 */
function cms_tree_page_view_add_spans_to_tree_ondata(data) {

	var childCount = data.attributes.childCount;
	if (childCount > 0) {
		data.data.title += "<span title='"+childCount+" child pages' class='child_count'>("+childCount+")</span>";
	}
	
	// add page type
	var rel = data.attributes.rel;
	if (rel != "publish") {
		data.data.title = "<span class='post_type post_type_"+rel+"'>"+rel+"</span>" + data.data.title;
	}

	// add actions that are revealed on mouse over
	data.data.title += " <span title='Edit page' class='cms_tpv_action_edit'>Edit</span>";
	data.data.title += " <span title='View page' class='cms_tpv_action_view'>View</span>";

	data.data.title += " <span class='cms_tpv_action_add_page'>Add page:</span>";
	data.data.title += " <span title='Add new page after' class='cms_tpv_action_add_page_after'>after</span> ";
	data.data.title += " <span title='Add new page inside' class='cms_tpv_action_add_page_inside'>inside</span>";
	
	// check if children exists. id they do: update their data too
	// DATA[index][children] is an array that may exists. in that case we must do this on all kids to...
	if (data.children) {
		jQuery.each(data.children, function(index, value) {
			cms_tree_page_view_add_spans_to_tree_ondata(data.children[index]);
		});
		
	}
	
	return data;
}
