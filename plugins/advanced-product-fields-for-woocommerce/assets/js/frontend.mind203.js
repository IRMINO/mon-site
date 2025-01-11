var _wapf=function(o){var e,t,u="wapf-",i="."+u,a=null,c=[],l={varsViaAjax:function(){return 0==o("[data-product_variations]").data("product_variations")},getFieldType:function(e){if(e.is("input"))return e.attr("type");for(var t=["select","textarea","option"],a=0;a<t.length;a++)if(e.is(t[a]))return t[a];return""},setFieldValue:function(e,r){switch(l.getFieldType(e)){case"radio":o('input[name="'+e.attr("name")+'"]').removeAttr("checked").filter('[value="'+r+'"]').prop("checked",!0);break;case"checkbox":var t=e.attr("name");"[]"==t.substring(t.length-2,t.length)?o('input[name="'+e.attr("name")+'"]').removeAttr("checked").each(function(e,t){var a=o(t);-1<o.inArray(a.val(),r)&&a.prop("checked",!0)}):r?e.prop("checked",!0):e.prop("checked",!1);break;default:e.val(r)}},getFieldValue:function(e){switch(l.getFieldType(e)){case"radio":var t=o('input[name="'+e.attr("name")+'"]:checked').val();return t||"";case"checkbox":var a=e.attr("name");if("[]"!=a.substring(a.length-2,a.length))return e.is(":checked");var r=[];return o('input[name="'+a+'"]:checked').each(function(e,t){r.push(o(t).val())}),r;default:return e.val()}},selectedQuantity:function(){var e=parseInt(o(".woocommerce input.qty").val().toString());return isNaN(e)?1:e},currentProductType:function(){return o(i+"product-totals").data("product-type")},currentProductPrice:function(){var e=l.selectedVariation();return"variable"==l.currentProductType()&&e?e.display_price:o(i+"product-totals").data("product-price")},currentVariationId:function(){var e=o('input[name="variation_id"]').val();return e?parseInt(e.toString()):0},selectedVariation:function(){var e=o("[data-product_variations]").data("product_variations");if(!e)return a;var t=l.currentVariationId();return t?l.qFirst(e,"variation_id",t):null},qFirst:function(e,t,a){for(var r=0;r<e.length;r++)if(e[r][t]===a)return e[r];return null},unformat:function(e,t){if(void 0===t&&(t=","),"number"==typeof e)return e;var a=new RegExp("[^0-9-"+t+"]","g"),r=parseFloat(e.replace(/\((.*)\)/,"-$1").replace(a,"").replace(t,"."));return isNaN(r)?0:r},formatNumber:function(e,t,a,r,n){var i=(e=l.unformat(e,r))<0?"-":"",c=parseInt(Math.abs(e).toFixed(t),10)+"",o=3<c.length?c.length%3:0,u=t?Math.abs(e).toFixed(t).split(".")[1]:"";return u=n?u.replace(/0+$/,""):u,i+(o?c.substr(0,o)+a:"")+c.substr(o).replace(/(\d{3})(?=\d)/g,"$1"+a)+(u?r+u:"")},formatMoney:function(e,t){return e<0&&t.format.replace("%2$s","-%2$s"),t.format.replace("%1$s",t.symbol).replace("%2$s",l.formatNumber(Math.abs(e),t.decimals||0,t.thousand,t.decimal,t.trimzero))}},d={init:function(e){o("[data-dependencies]").each(function(e,t){var a=o(t);c[a.data("field-id")]=l.getFieldValue(a)}),e.on("keyup change",i+"input",function(){d.doLogic(!1)}),d.doLogic(!0)},doLogic:function(n){o("[data-dependencies]").each(function(e,t){var a=o(t),r=a.closest(i+"field-container");d.canShow(a)?(r.removeClass(u+"hide"),a.prop("required",a.data("is-required")).prop("disabled",!1)):(r.addClass(u+"hide"),n||l.setFieldValue(a,c[a.data("field-id")]),a.prop("required",!1).prop("disabled",!0))})},canShow:function(e){var t=e.data("dependencies");if(!t||!Array.isArray(t))return!0;for(var a=0;a<t.length;a++)if(d.validateGroup(t[a].rules))return!0;return!1},validateGroup:function(e){void 0===e&&(e=[]);for(var t=0;t<e.length;t++)if(!d.validRule(e[t].field,e[t].condition,e[t].value||""))return!1;return!0},validRule:function(e,t,a){var r=o('[data-field-id="'+e+'"]').first();if(!r.length)return!1;if(r.closest(i+"field-container").hasClass(u+"hide"))return!1;var n=l.getFieldValue(r);switch("number"==typeof n&&(n=n.toString()),t){case"check":return!0===n;case"!check":return!1===n;case"==":return Array.isArray(n)?-1<o.inArray(a,n):n==a;case"!=":return Array.isArray(n)?-1==o.inArray(a,n):n!=a;case"empty":return n==[]||""==n;case"!empty":return n!=[]&&""!=n;case"lt":return parseFloat(n)<parseFloat(a);case"gt":return parseFloat(n)>parseFloat(a)}return!1}},s={init:function(){(e=o("[data-wapf-variation-rules]")).length&&(t=o('input[name="variation_id"]')).on("change",function(){s.doLogic()})},doLogic:function(){var c=t.val();e.each(function(e,t){for(var a=o(t),r=o(t).data(u+"variation-rules"),n=!1,i=0;i<r.length;i++)if(s.rulesValid(r[i],c)){n=!0;break}n?a.addClass(u+"show"):a.removeClass(u+"show")})},rulesValid:function(e,t){if(!e.length)return!0;for(var a=0;a<e.length;a++)if(!s.ruleValid(e[a],t))return!1;return!0},ruleValid:function(e,t){switch(t=parseInt(t),e.condition){case"product_var":return-1<o.inArray(t,e.values);case"!product_var":return-1==o.inArray(t,e.values)}return!1}},r={init:function(e){"product"===wapf_config.page_type&&o("[data-wapf-price]").length&&(e.on("keyup change",i+"input",function(){r.calculate()}),o("[data-qty-based]").length||o(".woocommerce").on("keyup change","input.qty",function(){r.calculate()}),o('input[name="variation_id"]').on("change",function(){r.calculate()}),r.calculate())},calculate:function(){var e=window.wapf_config.display_options,t=l.currentProductPrice()*l.selectedQuantity(),a=this.calculateOptions(),r="-total";o(i+"product"+r).html(l.formatMoney(t,e)),o(i+"options"+r).html(l.formatMoney(a,e)),o(i+"grand"+r).html(l.formatMoney(t+a,e)),o(i+"product"+r+"s").show()},calculateOptions:function(){var n=0;return o("[data-wapf-price]").each(function(e,t){var a=o(t),r=l.getFieldType(a);!0!==a.prop("disabled")&&(-1<o.inArray(r,["checkbox","radio"])&&!a.is(":checked")||("option"!=r||a.is(":selected")&&!0!==a.closest("select").prop("disabled"))&&a.val()&&(n+=parseFloat(a.data(u+"price")||0)))}),n}},n=o(i+"wrapper");d.init(n),s.init(),r.init(n),l.varsViaAjax()&&o("[data-wapf-price]").length&&jQuery(document).on("found_variation",function(e,t){jQuery(document).trigger("wapf-ajax-variation",[t]),a=t,r.calculate()}),o(i+"checkboxes[data-is-required=1]").each(function(e,t){function a(){r.filter(":checked").length&&r.not(":checked").prop("required",!1)}var r=o(t).find('input[type="checkbox"]');r.on("change",a),a()}),o(i+"checkable input").on("change",function(){var e=o(this);e.is(":radio")&&e.closest(i+"field-input").find(i+"checkable").removeClass(u+"checked"),o(this).closest(i+"checkable").toggleClass(u+"checked")})};!function(e){_wapf(e)}(jQuery);