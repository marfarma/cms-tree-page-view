
var cms_tpv_tree, treeOptions;
jQuery(function($) {
	
	cms_tpv_tree = $("#cms_tpv_container");

	/**
	 * show div with options
	 */
	$("#cms_tpv_container li").live("mouseenter", function() {
		$(this).find(".cms_tpv_tree_actions:first").show();
	});
	$("#cms_tpv_container li").live("mouseleave", function() {
		$(this).find(".cms_tpv_tree_actions:first").hide();
	});

	treeOptions = {
		xplugins: ["cookie","ui","crrm","themes","json_data","search","types","dnd"],
		plugins: ["themes","json_data","cookies","search","dnd"],
		core: {
			"html_titles": true
		},
		"json_data": {
			"ajax": {
				"url": ajaxurl + CMS_TPV_AJAXURL + CMS_TPV_VIEW,
				// this function is executed in the instance's scope (this refers to the tree instance)
				// the parameter is the node being loaded (may be -1, 0, or undefined when loading the root nodes)
				"data" : function (n) { 
					// the result is fed to the AJAX request `data` option
					if (n.data) {
						var post_id = n.data("jstree").post_id;
						return {
							"id": post_id
						}
					}
				}

			}
		},
		"themes": {
			"theme": "wordpress"
		},
		"search": {
			"ajax" : {
				"url": ajaxurl + CMS_TPV_AJAXURL + CMS_TPV_VIEW
			},
			"case_insensitive": true
		},
		"dnd": {
		}
	}

	if ($("#cms_tpv_container").length == 1) {
		cms_tpv_bind_clean_node();
		cms_tpv_tree.jstree(treeOptions);
	}

}); // end ondomready


// view page on click
jQuery(".cms_tpv_action_view").live("click", function() {
	var $li = jQuery(this).closest("li");
	var permalink = $li.data("jstree").permalink;
	if (permalink) {
		document.location = permalink;
	}
	return false;
});

// edit page on click
jQuery(".cms_tpv_action_edit").live("click", function() {
	var $li = jQuery(this).closest("li");
	var editlink = $li.data("jstree").editlink;
	if (editlink) {
		document.location = editlink;
	}
	return false;
});

// add page after
jQuery(".cms_tpv_action_add_page_after").live("click", function() {
	var new_page_title = prompt(cmstpv_l10n.Enter_title_of_new_page, "");
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
jQuery(".cms_tpv_action_add_page_inside").live("click", function() {
	var new_page_title = prompt(cmstpv_l10n.Enter_title_of_new_page, "");
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





// check if tree is beging dragged
function cms_tpv_is_dragging() {
	var eDrag = jQuery("#vakata-dragged");
	return eDrag.is(":visible");
}

// mouse over, show actions
jQuery(".jstree li a").live("mouseover", function() {
	$t = jQuery(this);
	$actions = $t.find(".cms_tpv_action_view, .cms_tpv_action_edit, .cms_tpv_action_add_page, .cms_tpv_action_add_page_after, .cms_tpv_action_add_page_inside");
//	$actions.show();
	if (cms_tpv_is_dragging() == false) {
		$actions.show();
	}
});
// ..and hide them again
jQuery(".jstree li a").live("mouseout", function() {
	$t = jQuery(this);
	$actions = $t.find(".cms_tpv_action_view, .cms_tpv_action_edit, .cms_tpv_action_add_page, .cms_tpv_action_add_page_after, .cms_tpv_action_add_page_inside");
	$actions.hide();
});


// hide action links on drag
jQuery.jstree.drag_start = function() {
	jQuery(".cms_tpv_action_view, .cms_tpv_action_edit, .cms_tpv_action_add_page, .cms_tpv_action_add_page_after, .cms_tpv_action_add_page_inside").hide();
}

/**
 * add childcount and other things to each li
 */
function cms_tpv_bind_clean_node() {
	
	cms_tpv_tree.bind("move_node.jstree", function (event, data) {
		var nodeBeingMoved = data.rslt.o; // noden vi flyttar
		var nodeNewParent = data.rslt.np;
		var nodePosition = data.rslt.p;
		var nodeR = data.rslt.r;
		var nodeRef = data.rslt.or; // noden som positionen gäller versus

		/*

		// om ovanför
		o ovanför or
		
		// om efter
		o efter r
		
		// om inside
		o ovanför or
		

		drop_target		: ".jstree-drop",
		drop_check		: function (data) { return true; },
		drop_finish		: $.noop,
		drag_target		: ".jstree-draggable",
		drag_finish		: $.noop,
		drag_check		: function (data) { return { after : false, before : false, inside : true }; }
		
		Gets executed after a valid drop, you get one parameter, which is as follows:
		data.o - the object being dragged
		data.r - the drop target
		*/
		
		if (nodePosition == "before") {
			var node_id = jQuery( nodeBeingMoved ).attr( "id" );
			ref_node_id = jQuery( nodeRef ).attr( "id" );
		} else if (nodePosition == "after") {
			var node_id = jQuery( nodeBeingMoved ).attr( "id" );
			ref_node_id = jQuery( nodeR ).attr( "id" );
		} else if (nodePosition == "inside") {
			var node_id = jQuery( nodeBeingMoved ).attr( "id" );
			ref_node_id = jQuery( nodeR ).attr( "id" );
		}
		
		// Update parent or menu order
		jQuery.post(ajaxurl, {
				action: "cms_tpv_move_page", 
				"node_id": node_id, 
				"ref_node_id": ref_node_id, 
				type: nodePosition 
			}, function(data, textStatus) {
		});

	});
	
	cms_tpv_tree.bind("clean_node.jstree", function(event, data) {
		obj = (data.rslt.obj);
		if (obj && obj != -1) {
			obj.each(function(i, elm) {
				var li = jQuery(elm);
				var aFirst = li.find("a:first");
				
				// check that we haven't added our stuff already
				if (li.data("done_cms_tpv_clean_node")) {
					return;
				} else {
					li.data("done_cms_tpv_clean_node", true);
				}
				
				// add number of children
				var childCount = li.data("jstree").childCount;
				if (childCount > 0) {
					aFirst.append("<span title='" + childCount + " " + cmstpv_l10n.child_pages + "' class='child_count'>("+childCount+")</span>");
				}
				
				// add page type
				var post_status = li.data("jstree").post_status;
				if (post_status != "publish") {
					aFirst.find("ins").after("<span class='post_type post_type_"+post_status+"'>"+post_status+"</span>");
				}
			
				// add div for mega super über cool mouseover/dropdown actions
				/*
				var divHTML = "<div class='cms_tpv_tree_actions'>";
				divHTML += "<p>ola!</p>";
				divHTML += "<p>lorem ipsum dolor sit amet</p>";
				divHTML += "</div>";
				li.prepend(divHTML);
				*/
				
				// add actions that are revealed on mouse over
				var html = "";
				html += " <span title='"+cmstpv_l10n.Edit_page+"' class='cms_tpv_action_edit'>"+cmstpv_l10n.Edit+"</span>";
				html += " <span title='"+cmstpv_l10n.View_page+"' class='cms_tpv_action_view'>"+cmstpv_l10n.View+"</span>";
			
				html += " <span class='cms_tpv_action_add_page'>"+cmstpv_l10n.Add_page+":</span>";
				html += " <span title='"+cmstpv_l10n.Add_new_page_after+"' class='cms_tpv_action_add_page_after'>"+cmstpv_l10n.after+"</span> ";
				html += " <span title='"+cmstpv_l10n.Add_new_page_inside+"' class='cms_tpv_action_add_page_inside'>"+cmstpv_l10n.inside+"</span>";
				aFirst.append(html);
				
			});
		}
	});
}

// search: perform
jQuery("#cms_tree_view_search_form").live("submit", function() {
	jQuery("#cms_tpv_search_no_hits").hide();
	var s = jQuery("#cms_tree_view_search").attr("value");
	s = jQuery.trim( s );
	// search, oh the mighty search!
	if (s) {
		jQuery("#cms_tree_view_search_form_working").fadeIn("fast");
		jQuery("#cms_tree_view_search_form_reset")
		cms_tpv_tree.jstree("search", s);
		jQuery("#cms_tree_view_search_form_reset").fadeIn("fast");
	} else {
		cms_tpv_tree.jstree("clear_search");
		jQuery("#cms_tree_view_search_form_reset").fadeOut("fast");
	}
	jQuery("#cms_tree_view_search_form_working").fadeOut("fast");
	return false;
});

// search: reset
jQuery("#cms_tree_view_search_form_reset").live("click", function() {
	jQuery("#cms_tree_view_search").val("")
	cms_tpv_tree.jstree("clear_search");
	jQuery("#cms_tree_view_search_form_reset").fadeOut("fast");
	return false;
});

// open/close links
jQuery("#cms_tpv_open_all").live("click", function() {
	cms_tpv_tree.jstree("open_all");
	return false;
});
jQuery("#cms_tpv_close_all").live("click", function() {
	cms_tpv_tree.jstree("close_all");
	return false;
});

// view all or public
jQuery("#cms_tvp_view_all").live("click", function() {
	cms_tvp_set_view("all");
	jQuery(this).addClass("current");
	return false;
});
jQuery("#cms_tvp_view_public").live("click", function() {
	cms_tvp_set_view("public");
	jQuery(this).addClass("current");
	return false;
});
function cms_tvp_set_view(view) {
	jQuery("#cms_tvp_view_all,#cms_tvp_view_public").removeClass("current");
	jQuery("#cms_tpv_container").jstree("destroy").html("");
	cms_tpv_bind_clean_node();
	treeOptions.json_data.ajax.url = ajaxurl + CMS_TPV_AJAXURL + view;
	cms_tpv_tree.jstree(treeOptions);
}